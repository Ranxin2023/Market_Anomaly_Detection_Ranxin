
from sklearn.ensemble import IsolationForest

def apply_isolation_forest(data, params):
    """
    Runs Isolation Forest for anomaly detection.
    
    Args:
        data (array-like): Input data.
        params (dict): Parameters for Isolation Forest.
            - n_estimators (int): Number of trees in the forest.
            - contamination (float): Proportion of anomalies in the data.
    
    Returns:
        array: Predictions for each data point (-1 for anomaly, 1 for normal).
    """
    iso_model = IsolationForest(
        n_estimators=params.get("n_estimators", 100),
        contamination=params.get("contamination", 0.05),
        random_state=42,
    )
    iso_model.fit(data)
    return iso_model.predict(data)
