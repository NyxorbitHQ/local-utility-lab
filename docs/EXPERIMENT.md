# Validation plan

[English](EXPERIMENT.md) · [简体中文](EXPERIMENT.zh-CN.md)

Status: a plan, not collected evidence. No user interviews, usage measurements or sales have been completed. This document does not send messages or publish posts.

## Two-week schedule

| Days | Work |
| --- | --- |
| 1–2 | Verify the live app, walkthrough, README and standalone download. |
| 3–5 | The owner may publish one technical article and one maker post after reviewing community rules. |
| 6–10 | Respond to voluntary feedback and fix task blockers. |
| 11–14 | Ask consenting participants whether they reused the tool. |

Internal targets, not forecasts: 20 target users try it, five complete an authorized task, three report reuse. Record non-sensitive aggregate counts and voluntary answers only. Repository visits/stars do not prove tool use. Do not add telemetry or automated outreach.

## Stage 1: task completion

The owner invites five developers, QA engineers or support staff who already export HARs to try voluntarily. Ask them to import an authorized file, locate failed requests, remove remaining sensitive path details and export material they can share with colleagues. User files do not go to maintainers.

Record completion time, guidance needed, types of missed sensitive details without original values, unhelpful report content and whether existing tools work better. Continue if at least three people finish independently and identify a concrete improvement over their existing workflow. This is an internal decision threshold, not an industry benchmark.

## Stage 2: repeat use

With the owner's publication approval, share a synthetic-data demo and collect voluntary feedback. Use public issues with no real logs; do not add tracking scripts or imply an anonymous feedback service exists.

Ask:

1. Did you use it again in the last two weeks?
2. What did you use before, and why choose this tool?
3. Which missing feature matters most?
4. How would you complete the task if this tool disappeared?

Also ask what task they attempted, whether they finished and where they got stuck. Do not collect files, credentials or private URLs. If none of 20 target users reuses it, investigate task frequency and alternatives before adding features.

## Stage 3: paid-demand validation

Only after repeat use, demonstrate deliverable additions to people with a specific need: batch files, two-HAR comparison, report templates or internal deployment support. Do not put the entire basic tool behind a paywall or build accounts/payments prematurely.

Give a concrete price for an explicit license or service scope and record whether the person actually pays; praise is not a purchase. The basic version is MIT licensed. Reassess delivery costs, licensing and maintenance obligations for commercial additions. No income is promised.
