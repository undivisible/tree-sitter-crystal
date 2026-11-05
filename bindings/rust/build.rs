fn main() {
    println!("cargo:rerun-if-changed=src/parser.c");
    let src_dir = std::path::Path::new("src");
    let mut c_config = cc::Build::new();
    c_config.include(src_dir);
    c_config.file(src_dir.join("parser.c"));
    c_config.compile("tree-sitter-crystal");
}
