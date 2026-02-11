# Math.NET Rules

Best practices and rules for Math.NET.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use `Matrix<double>.Build` and `Vector<double>.Build` factory methods | MEDIUM | [`mathnet-use-matrix-double-build-and-vector-double-build-factory.md`](mathnet-use-matrix-double-build-and-vector-double-build-factory.md) |
| 2 | Choose the right decomposition | MEDIUM | [`mathnet-choose-the-right-decomposition.md`](mathnet-choose-the-right-decomposition.md) |
| 3 | Enable MKL native provider | CRITICAL | [`mathnet-enable-mkl-native-provider.md`](mathnet-enable-mkl-native-provider.md) |
| 4 | Use `Statistics` extension methods | MEDIUM | [`mathnet-use-statistics-extension-methods.md`](mathnet-use-statistics-extension-methods.md) |
| 5 | Prefer `Fit.Polynomial` and `Fit.Line` over manual matrix construction | LOW | [`mathnet-prefer-fit-polynomial-and-fit-line-over-manual-matrix.md`](mathnet-prefer-fit-polynomial-and-fit-line-over-manual-matrix.md) |
| 6 | Seed random number generators | CRITICAL | [`mathnet-seed-random-number-generators.md`](mathnet-seed-random-number-generators.md) |
| 7 | Use sparse matrix builders | MEDIUM | [`mathnet-use-sparse-matrix-builders.md`](mathnet-use-sparse-matrix-builders.md) |
| 8 | Check matrix condition number | MEDIUM | [`mathnet-check-matrix-condition-number.md`](mathnet-check-matrix-condition-number.md) |
| 9 | Use `GoodnessOfFit.RSquared` | MEDIUM | [`mathnet-use-goodnessoffit-rsquared.md`](mathnet-use-goodnessoffit-rsquared.md) |
| 10 | Avoid creating large temporary matrices | HIGH | [`mathnet-avoid-creating-large-temporary-matrices.md`](mathnet-avoid-creating-large-temporary-matrices.md) |
