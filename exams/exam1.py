import numpy as np

M = np.array([[0.5, 0.5], [0.25, 0.75]])
M = np.linalg.matrix_power(M, 100)
m = np.sum(M, axis=1)
print(M)
print(m)
