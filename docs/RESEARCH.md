# HAR research

[English](RESEARCH.md) · [简体中文](RESEARCH.zh-CN.md)

Research date: 2026-10-20. This document considers the HAR workbench, existing alternatives and the limits of current evidence. It does not establish revenue or willingness to pay.

## Conclusion

This project focuses on local HAR redaction and evidence reports. HAR tools already face substantial competition. The experiment tests whether combining safer sharing and evidence preparation is more convenient than an existing workflow.

## Sources reviewed

| Source | Type | Observation | Evidence limits |
| --- | --- | --- | --- |
| [Chrome Network reference](https://developer.chrome.com/docs/devtools/network/reference/) | Official documentation | HAR export includes basic sanitization, excluding headers such as Cookie, Set-Cookie and Authorization by default. | Establishes existing capability, not an unmet paid need. |
| [Google HAR Sanitizer](https://github.com/google/har-sanitizer) | Open-source competitor | Supports selecting headers, parameters and content types and exporting sanitized HARs. | Establishes competition; this project does not copy its source or claim to invent HAR sanitization. |
| [HAR sharing discussion](https://www.reddit.com/r/webdev/comments/1qg37h3/do_you_scrub_har_files_before_sending_them_to/) | Community anecdotes, not a representative sample | Participants raise credential concerns and ask about local processing. | A problem clue, not evidence of market size or willingness to pay. |

## MVP trade-offs

- Browser-local processing reduces setup friction and does not require access to another person's business systems.
- Allowlisted-field reconstruction conservatively drops bodies and extension metadata, accepting some loss of debugging detail.
- Readable reports describe evidence; status codes do not establish AI-generated root causes.
- Users may copy AI-ready material to their own model. The app collects no API keys and does not pay for model calls.
- Static files avoid per-use model fees in the free version, but development, maintenance, acquisition and support still cost time.

## Still unverified

- Whether people reuse this tool instead of browsers, scripts or existing competitors.
- Which users most need reports, batch processing or comparisons.
- Actual download and repeat-use counts.
- Pricing, conversion, acquisition cost and revenue.

No user interviews, retention measurements, price validation or sales have been completed. Shipping software, finding competitors or reading anecdotes does not establish commercial validation.
