import numpy as np

M = np.array([[507., 845., 338.], [676., 2028., 676.], [845., 845., 1690.]])
m = np.sum(M, axis=1)
for i in range(len(M)):
    M[i] = np.multiply(M[i], 1. / m[i])
m = np.sum(M, axis=1)
M = np.linalg.matrix_power(M, 3)
print(M)
print(m)
