---
title: "GopherCon 2019 - Optimization for number of goroutines using feedback control"
description: "The design for the number of concurrency is important to achieve both speed and stability. To give a good performance without depending on platform and load conditions, it’s desirable for the number to be dynamic and rapidly controlled. In this talk, I will propose an architecture to solve this by utilizing feedback control."
author: $LIVEBLOGGER_NAME for the GopherCon 2019 Liveblog
publishDate: 2019-07-25T00:00-14:00
tags: [
  gophercon
]
slug: gophercon-2019-optimization-for-number-of-goroutines-using-feedback-control
heroImage: https://about.sourcegraph.com/gophercon2019.png
published: false
---

Presenter: [Yusuke Miyake](https://twitter.com/monochromegane) | Liveblogger: [\$LIVEBLOGGER_NAME]($LIVEBLOGGER_URL)

## Overview

The design for the number of concurrency is important to achieve both speed and stability. To give a good performance without depending on platform and load conditions, it’s desirable for the number to be dynamic and rapidly controlled. In this talk, I will propose an architecture to solve this by utilizing feedback control.

---

### Talk is split into a six parts. 

#### Part zero is quick introduction to the speaker.

Yusuke, run the local Go community in Fukuoka, Japan, who just finished hosting their Go Conference on 13 of July. 
Two hundren gophers showed up, it was a lot of fun.
The other place you may know him from is [platinum searcher](https://github.com/monochromegane/the_platinum_searcher), which is a grep like tool for code -- similar to [silver searcher](https://geoff.greer.fm/ag/) or [ack](https://beyondgrep.com/).


#### The first part is why the need arose for hime to figure out a way to optimization for the number of goroutines.

He was working on optimizing pt (platinum searcher), and the question occured to him. How many go rountines is the optimal number of go routines to have running. Pt uses many go routines to search for string matches across many files. 
He started by measuring the performance and bounded the concurrancy using a semaphore. What he saw was that he was able to get good performance out 8-32 go routines. This is 2 to 8 time the number of cpus on his machine. (Two cpu machine)
However, different environments results in vastly different results. In one environment with 8 cpus, having only 16 go routines resulted in good performance, which is only 2x, and having more then 16 go routines caused performance degration. 

Another issue was that as soon as the virus scanner kicked in, open files become slow and consumed cpu resources, and open multiple files at the same time degraded performance badly.

Leading to the question of how many goroutines are ideal under all conditions.

#### In the next part he talked about the complexity of concurrency and parallelism.

