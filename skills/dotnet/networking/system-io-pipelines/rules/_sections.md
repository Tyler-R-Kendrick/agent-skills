# System.IO.Pipelines Rules

Best practices and rules for System.IO.Pipelines.

## Rules

| # | Rule | Impact | File |
|---|------|--------|------|
| 1 | Use Pipelines when `Stream` APIs become a bottleneck | MEDIUM | [`system-io-pipelines-use-pipelines-when-stream-apis-become-a-bottleneck.md`](system-io-pipelines-use-pipelines-when-stream-apis-become-a-bottleneck.md) |
| 2 | Always call `reader.AdvanceTo(consumed, examined)` | CRITICAL | [`system-io-pipelines-always-call-reader-advanceto-consumed-examined.md`](system-io-pipelines-always-call-reader-advanceto-consumed-examined.md) |
| 3 | Check `result.IsCompleted` | MEDIUM | [`system-io-pipelines-check-result-iscompleted.md`](system-io-pipelines-check-result-iscompleted.md) |
| 4 | Use `SequenceReader<byte>` | MEDIUM | [`system-io-pipelines-use-sequencereader-byte.md`](system-io-pipelines-use-sequencereader-byte.md) |
| 5 | Configure `pauseWriterThreshold` and `resumeWriterThreshold` | HIGH | [`system-io-pipelines-configure-pausewriterthreshold-and-resumewriterthreshold.md`](system-io-pipelines-configure-pausewriterthreshold-and-resumewriterthreshold.md) |
| 6 | Avoid slicing `ReadOnlySequence` into `byte[]` | HIGH | [`system-io-pipelines-avoid-slicing-readonlysequence-into-byte.md`](system-io-pipelines-avoid-slicing-readonlysequence-into-byte.md) |
| 7 | Run the writer and reader on separate tasks | MEDIUM | [`system-io-pipelines-run-the-writer-and-reader-on-separate-tasks.md`](system-io-pipelines-run-the-writer-and-reader-on-separate-tasks.md) |
| 8 | Call `CompleteAsync` on both `PipeReader` and `PipeWriter` | MEDIUM | [`system-io-pipelines-call-completeasync-on-both-pipereader-and-pipewriter.md`](system-io-pipelines-call-completeasync-on-both-pipereader-and-pipewriter.md) |
| 9 | Set `useSynchronizationContext: false` | HIGH | [`system-io-pipelines-set-usesynchronizationcontext-false.md`](system-io-pipelines-set-usesynchronizationcontext-false.md) |
| 10 | Use `PipeReader.Create(stream)` and `PipeWriter.Create(stream)` | MEDIUM | [`system-io-pipelines-use-pipereader-create-stream-and-pipewriter-create-stream.md`](system-io-pipelines-use-pipereader-create-stream-and-pipewriter-create-stream.md) |
