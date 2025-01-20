from sklearn.decomposition import PCA

def apply_pca(data, n_components=5):
    """
    Applies PCA to reduce dimensionality of the data.
    
    Args:
        data (array-like): Input data.
        n_components (int): Number of principal components to retain.
    
    Returns:
        tuple: Transformed data and explained variance ratio.
    """
    pca = PCA(n_components=min(n_components, data.shape[1]))
    transformed_data = pca.fit_transform(data)
    explained_variance = pca.explained_variance_ratio_
    return transformed_data, explained_variance
