---
title: "PedalKernel"
description: "Open source Wave Digital Filter framework for guitar effects, written in Rust"
---

{{< hero-os >}}

## What is PedalKernel?

PedalKernel is an **open source Wave Digital Filter (WDF) framework** written in Rust for modeling analog guitar effects circuits.

We're not a company. We're not selling anything. We're just a group of engineers and musicians who think digital guitar effects should actually understand how analog circuits work.

## Why Wave Digital Filters?

Most digital pedal plugins approximate the sound. They feed a signal through wavetables or impulse responses and call it "modeling."

WDF is different. It simulates the actual circuit — resistors, capacitors, op-amps, transistors — at the component level. The math preserves the physical relationships between elements, which means:

- **Dynamic response** — The circuit behaves differently at different volumes, just like the real thing
- **Interactive controls** — Turning a knob affects the signal path in realistic ways
- **Non-linear behavior** — Saturation, clipping, and feedback happen naturally
- **Stability** — Guaranteed stable under all conditions (unlike some other circuit simulation methods)

## The Tech

### Rust
Memory-safe systems programming with zero-allocation audio paths. No garbage collection pauses. Real-time safe by design.

### Wave Digital Filters
A port-Hamiltonian approach to circuit simulation. Instead of solving Kirchhoff's laws directly, WDF uses scattering parameters to propagate waves through the circuit. It's the same math used in high-end hardware modeling, academic research, and RF engineering.

### Composable Trees
Circuits are built as trees of WDF elements:
- **Leaves** — Resistors, capacitors, inductors, voltage sources
- **Adaptors** — Series and parallel connection topologies  
- **Root** — The driving point where waves are reflected back into the circuit

Want to add a tone stack? Insert a subtree. Want to swap clipping diodes? Replace one leaf. The framework handles the topology automatically.

## The Circuits

We're building reference implementations of classic pedal circuits:

### Overdrive
Tube Screamer-style soft clipping. JFET input buffer, dual op-amp gain stage, diode clipper, tone stack. We model every component, including the op-amp's slew rate limitations.

### FuzzFace  
Germanium fuzz with all the instability that makes it musical. Temperature-dependent transistor behavior, leakage currents, the way the bias drifts as the device warms up. It's temperamental, just like the originals.

### Delay
Analog bucket-brigade delay simulation. Clock noise, aliasing, the degradation of repeats as they circulate through the delay line. Digital delay that actually sounds analog.

## Open Source

The kernel is licensed under the AGPLv3. This means any derivative work must also be open source. Build a hardware DSP box. Build a web-based guitar pedal simulator. Just don't blame us if you blow up your speakers.

**[github.com/ajmwagar/pedalkernel](https://github.com/ajmwagar/pedalkernel)**

### Contributing

We need help with:
- More circuit element models (vacuum tubes, transformers, varistors)
- Additional pedal implementations (phaser, chorus, reverb, wah)
- Performance optimizations (SIMD, parallel trees)
- Better documentation (tutorials, theory explainers)
- Platform ports (LV2, AU, CLAP plugin formats)

If you understand schematics and know some Rust, jump in.

## The Pro Plugin

We also build a commercial VST3 plugin called **PedalKernel Pro**. It's built on this same open source kernel, but with a polished UI, more effects, and professional support.

If you want to support the project (or just don't want to compile Rust code), [check it out](/pro/).

## Physical Pedals

Our circuit designs are being turned into physical pedals by **[Puget Audio](https://puget.audio/)** — a boutique builder here in Seattle. Same math, same component values, but with actual solder and metal boxes.

If you want a PedalKernel circuit you can stomp on, [check them out](https://puget.audio/).

## Made in Seattle

We're based in Seattle, Washington — home of Jimi Hendrix, Nirvana, Soundgarden, and countless other musicians who cared deeply about tone.

This city has a long history of sonic experimentation. We're just carrying that forward into the open source realm.

## FAQ

**Q: Is PedalKernel really free?**  
A: Yes. AGPLv3 licensed. The code is free and open source.

**Q: Can I use this in a commercial product?**  
A: You can use it, but any derivative work must also be open source under AGPLv3. Just include the license.

**Q: Do I need to know Rust?**  
A: To hack on the kernel, yes. To just use the plugin, no.

**Q: How accurate is the modeling?**  
A: It depends on how well we characterized the original circuit. The WDF math itself is exact — the accuracy is limited by component tolerances and how well we measured the original.

**Q: Can I contribute a circuit?**  
A: Please do. Trace a schematic, build a WDF tree, send a PR. We'll help you get it merged.

**Q: What's the difference between the open source kernel and PedalKernel Pro?**  
A: The kernel is the engine. Pro is a car built on that engine — polished UI, more effects, professional support, and you don't have to compile anything.

## Contact

Questions? Ideas? Want to talk about scattering parameters?

- GitHub Issues: [github.com/ajmwagar/pedalkernel/issues](https://github.com/ajmwagar/pedalkernel/issues)
- Email: [info@pedalkernel.com](mailto:info@pedalkernel.com)

Built with care in the Pacific Northwest.
