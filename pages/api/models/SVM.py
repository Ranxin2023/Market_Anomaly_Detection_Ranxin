from sklearn.svm import OneClassSVM
import numpy as np

def apply_svm(data, params=None):
    """
    Apply SVM (One-Class SVM) for anomaly detection.

    Args:
        data (pd.DataFrame): The input data for training and prediction.
        params (dict): Hyperparameters for the SVM model. Example:
                       {"nu": 0.05, "kernel": "rbf", "gamma": "scale"}

    Returns:
        list: A list of predictions (-1 for anomalies, 1 for normal data).
    """
    if params is None:
        # Default parameters for SVM
        params = {"nu": 0.05, "kernel": "rbf", "gamma": "scale"}

    # Ensure the data is in NumPy format for compatibility
    X = data.values if hasattr(data, "values") else np.array(data)

    # Initialize and train the SVM model
    model = OneClassSVM(**params)
    model.fit(X)

    # Predict anomalies (-1 for anomaly, 1 for normal)
    predictions = model.predict(X)

    return predictions
