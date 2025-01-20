from sklearn.decomposition import PCA
import numpy as np
import pandas as pd

def apply_rpca(data, n_components=None):
    """
    Apply Robust PCA (rPCA) for dimensionality reduction and anomaly detection.

    Args:
        data (pd.DataFrame): The input data for analysis.
        n_components (int): Number of principal components to keep. Defaults to None (all components).

    Returns:
        pd.DataFrame: The transformed data with reduced dimensions.
        np.ndarray: Explained variance ratio for each principal component.
    """
    # Ensure the data is in NumPy format
    X = data.values if hasattr(data, "values") else np.array(data)
    
    # Subtract the mean for centering
    X_centered = X - np.mean(X, axis=0)

    # Perform Singular Value Decomposition (SVD)
    U, S, Vt = np.linalg.svd(X_centered, full_matrices=False)

    # Retain the desired number of components
    if n_components:
        U = U[:, :n_components]
        S = S[:n_components]
        Vt = Vt[:n_components, :]

    # Low-rank approximation
    low_rank = np.dot(U, np.dot(np.diag(S), Vt))
    sparse = X - low_rank

    # Explained variance ratio
    explained_variance_ratio = S**2 / np.sum(S**2)

    return pd.DataFrame(low_rank, columns=data.columns), explained_variance_ratio
