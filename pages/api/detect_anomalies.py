import os
from dotenv import load_dotenv
import pandas as pd
import json
import sys
from openai import OpenAI
from sklearn.model_selection import train_test_split
from models.IsolationForest import apply_isolation_forest
from models.PCA import apply_rpca
from models.SVM import apply_svm
load_dotenv()
# File path and input features
file_path = os.path.join(os.path.dirname(__file__), "../../datasets/FinancialMarketData.csv")
features = json.loads(sys.argv[1])  # Parse features as the first argument
models_to_run = json.loads(sys.argv[2])  # Parse model names as the second argument (e.g., ["PCA", "IsolationForest"])

# Set your OpenAI API key
openai_api_key = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(
    
    api_key=openai_api_key
)
def load_data(file_path, features):
    try:
        data = pd.read_csv(file_path, header=5)
    except FileNotFoundError:
        return {"error": f"File not found: {file_path}"}, None
    except Exception as e:
        return {"error": f"Error loading file: {e}"}, None

    columns_to_use = [col for col in features if col in data.columns]
    if not columns_to_use:
        return {"error": "No valid columns found based on provided features."}, None

    numerical_data = data[columns_to_use].dropna()
    return None, numerical_data

def generate_general_response(model_name, explanation_context):
    """
    Generate a user-friendly general response using OpenAI's GPT.

    Args:
        model_name (str): The name of the model used (e.g., "RandomForest", "PCA").
        explanation_context (dict): Context information about the analysis or anomalies.

    Returns:
        str: A general explanation for the user.
    """
    prompt = (
        f"Generate a general explanation for the results of a {model_name} model. "
        f"The model was used for analyzing financial market data. "
        f"Provide a user-friendly explanation based on this context:\n\n{json.dumps(explanation_context)}"
    )

    try:
        response = openai_client.chat.completions.create(
        # model name used here is text-davinci-003
        # there are many other models available under the 
        # umbrella of GPT-3
            model="gpt-4",
            store=True,
            messages=[
                # {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
            
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error generating response with LLM: {e}"
result = []

def main():
    # Load data
    error, data = load_data(file_path, features)
    if error:
        print(error)
        return

    # Train-test split
    X_train, X_test = train_test_split(data, test_size=0.2, random_state=42)

    # Iterate through the specified models
    for model_name in models_to_run:
        try:
            for feature in features:
                # Use only the current feature for model training
                feature_data = X_train[[feature]]

                if model_name == "rPCA":
                    # Apply PCA to the current feature
                    X_train_pca, explained_variance = apply_rpca(feature_data, n_components=1)
                    explanation_context = {
                        "feature": feature,
                        "explained_variance_ratio": explained_variance.tolist(),
                        "description": f"PCA was used to analyze the feature '{feature}', reducing dimensionality to identify the most significant component.",
                    }
                    explanation = generate_general_response("rPCA", explanation_context)
                    # print(f"General Explanation for PCA on '{feature}':")
                    # print(explanation)
                    result.append({
                        "feature": feature,
                        "model": "rPCA",
                        "explained_variance_ratio": explained_variance.tolist(),
                        "explanation": explanation,
                    })

                elif model_name == "IsolationForest":
                    # Apply Isolation Forest for the current feature
                    params = {
                        "n_estimators": 100,
                        "contamination": 0.05,
                    }
                    results = apply_isolation_forest(feature_data, params)
                    anomalies = [i for i, pred in enumerate(results) if pred == -1]
                    explanation_context = {
                        "feature": feature,
                        "model": "IsolationForest",
                        "anomalies_count": len(anomalies),
                        "description": f"The Isolation Forest model detected {len(anomalies)} anomalies in the feature '{feature}'. This indicates potential outliers or unusual patterns in this specific feature.",
                    }
                    explanation = generate_general_response("IsolationForest", explanation_context)
                    # print(f"General Explanation for Isolation Forest on '{feature}':")
                    # print(explanation)
                    result.append({
                        "feature": feature,
                        "model": "IsolationForest",
                        "anomalies_count": len(anomalies),
                        "explanation": explanation,
                    })
                elif model_name == "SVM":
                    params = {"nu": 0.1, "kernel": "rbf", "gamma": "scale"}
                    results = apply_svm(feature_data, params)
                    anomalies = [i for i, pred in enumerate(results) if pred == -1]
                    explanation_context = {
                        "feature": feature,
                        "model": "SVM",
                        "anomalies_count": len(anomalies),
                        "description": f"The SVM model detected {len(anomalies)} anomalies in the feature '{feature}'.",
                    }
                    explanation = generate_general_response("SVM", explanation_context)
                    result.append({
                        "feature": feature,
                        "model": "SVM",
                        "anomalies_count": len(anomalies),
                        "explanation": explanation,
                    })
                else:
                    print(f"Model '{model_name}' is not supported.")

        except Exception as e:
            print(f"Error processing model '{model_name}' on feature '{feature}': {e}")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
