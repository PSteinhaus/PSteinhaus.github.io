# ggez animation example

This is [the animation example from good-web-game](https://github.com/ggez/good-web-game/blob/master/examples/animation.rs), compiled to Wasm.

Apart from the drawn controls the only difference to [the original ggez animation example](https://github.com/ggez/ggez/blob/devel/examples/animation.rs) is in the boilerplate code.

ggez:
```rust
pub fn main() -> GameResult {
    let resource_dir = if let Ok(manifest_dir) = env::var("CARGO_MANIFEST_DIR") {
        let mut path = path::PathBuf::from(manifest_dir);
        path.push("resources");
        path
    } else {
        path::PathBuf::from("./resources")
    };

    let cb = ggez::ContextBuilder::new("animation example", "ggez").add_resource_path(resource_dir);
    let (mut ctx, event_loop) = cb.build()?;
    let state = MainState::new(&mut ctx)?;

    // instructions
    println!("CONTROLS:");
    println!("Left/Right: change animation");
    println!("Up/Down: change easing function");
    println!("W/S: change duration");

    event::run(ctx, event_loop, state)
}
```

good-web-game:
```rust
pub fn main() -> GameResult {
    let resource_dir = if let Ok(manifest_dir) = env::var("CARGO_MANIFEST_DIR") {
        let mut path = path::PathBuf::from(manifest_dir);
        path.push("resources");
        path
    } else {
        path::PathBuf::from("./resources")
    };

    // instructions
    println!("CONTROLS:");
    println!("Left/Right: change animation");
    println!("Up/Down: change easing function");
    println!("W/S: change duration");

    ggez::start(
        ggez::conf::Conf::default()
            .cache(miniquad::conf::Cache::Tar(include_bytes!("resources.tar")))
            .physical_root_dir(Some(resource_dir)),
        |mut context| Box::new(MainState::new(&mut context).unwrap()),
    )
}
```
