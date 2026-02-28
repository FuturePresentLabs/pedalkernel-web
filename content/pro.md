---
title: "PedalKernel Pro"
description: "Wave Digital Filter guitar effects software, made in Seattle"
---

{{< hero >}}

## What is it?

PedalKernel Pro is a VST3 plugin built on a **Wave Digital Filter (WDF) framework** written in Rust.

Instead of approximating how pedals sound, we model how they actually work at the circuit level. Resistors, capacitors, germanium transistors — all the physical components that create "that sound" — simulated with mathematical precision.

**Why WDF?**

- **Physical accuracy** — Models actual circuit behavior, not approximations
- **Stability** — Guaranteed stable under all conditions (won't blow up your mix)
- **Modularity** — Circuit elements connect like building blocks
- **Real-time safe** — Zero-allocation audio processing, no garbage collection pauses

The same techniques used in academic research and high-end hardware modeling, now in a plugin you can actually afford.

## The PedalKernel Legends Bundle

Five legendary circuits, modeled component-by-component:

| Circuit | Type | Why It's Legendary |
|---------|------|-------------------|
| **Klon Centaur** | Overdrive | The $5000 unicorn everyone wants |
| **Memory Man** | BBD Delay | MN3005 warm analog repeats |
| **Uni-Vibe** | Modulation | Hendrix, Gilmour, Trower tone |
| **RE-201 Space Echo** | Tape + Reverb | Ambient/shoegaze essential |
| **Tweed Deluxe 5E3** | Tube Amp | Neil Young's $2000 amp |

You're getting a $5000 Klon, a $2000 amp, and three other legendary circuits for $49.

## Under the Hood

Built in **Rust** for memory safety without garbage collection. JACK audio integration for pro-level latency. Composable circuit trees mean we can build complex circuits from simple primitives.

If you're the type who reads schematic diagrams for fun, check out the [open source kernel](https://github.com/ajmwagar/pedalkernel). The framework is there — build your own effects, contribute circuits, or just see how it works.

## Made in Seattle

We're based in Seattle, Washington — home of Jimi Hendrix, Nirvana, Soundgarden, and countless other musicians who cared deeply about tone.

This city has a long history of sonic experimentation. We're just carrying that forward into the digital realm.

## Physical Pedals: The Puget Audio Partnership

Software is our focus, but we know some of you want the real thing. That's why we've partnered with **[Puget Audio](https://puget.audio/)** — a boutique pedal builder here in Seattle.

They take our WDF circuit designs and turn them into physical pedals. Same math, same component values, but with actual solder and metal boxes. Hand-wired, laser-engraved, built to last.

If you want a PedalKernel circuit in physical form, [check out Puget Audio](https://puget.audio/). They offer standard builds and custom one-offs for the true tone-freaks.

## Get It From

Available through our partner **[Puget Audio](https://puget.audio/)** — a boutique pedal builder here in Seattle.

**$49** — one time, no subscription.  
VST3 for macOS, Windows, and Linux. Unlimited device activations. All future updates free.

[Get PedalKernel Pro from Puget Audio →](https://puget.audio/)

## FAQ

**Q: Is this a subscription?**  
A: No. Buy once, keep forever.

**Q: What makes WDF better than other modeling techniques?**  
A: WDF preserves the physical relationships between circuit components. Other methods approximate the input/output behavior. WDF simulates the actual circuit. The difference is subtle but real — better dynamic response, more realistic interaction between controls.

**Q: What formats?**  
A: VST3 for macOS, Windows, and Linux.

**Q: Do you offer refunds?**  
A: Yes, 30 days. If it doesn't work for you, we'll refund no questions asked.

**Q: Can I get these circuits as physical pedals?**  
A: Yes — our partner [Puget Audio](https://puget.audio/) builds physical versions of our circuits. Hand-wired, boutique quality.

**Q: Can I hack on this?**  
A: The kernel is open source at [github.com/ajmwagar/pedalkernel](https://github.com/ajmwagar/pedalkernel). The plugin is built on top of it. If you want to understand how WDF works or build your own circuits, start there.

## Contact

Questions? Ideas? Want to talk about germanium transistor matching?

Email us: [info@pedalkernel.com](mailto:info@pedalkernel.com)

Built with care in the Pacific Northwest.
