import os
import re
from PIL import Image

def main():
    src_dir = r"C:\Users\M.S.THILAGAN\Downloads\ezgif-split"
    dest_dir = r"C:\Users\M.S.THILAGAN\Documents\thilagan_portfolio2\public\sequence"
    
    if not os.path.exists(src_dir):
        print(f"Error: Source directory {src_dir} does not exist.")
        return
        
    os.makedirs(dest_dir, exist_ok=True)
    print(f"Created destination directory: {dest_dir}")
    
    # List files and filter for PNGs
    files = [f for f in os.listdir(src_dir) if f.endswith('.png')]
    print(f"Found {len(files)} PNG files in source directory.")
    
    # Sort files numerically based on frame index
    # Match frame_(\d+)_delay
    pattern = re.compile(r'frame_(\d+)_delay')
    
    converted_count = 0
    for filename in sorted(files):
        match = pattern.search(filename)
        if not match:
            continue
            
        frame_idx = int(match.group(1))
        # Format destination filename as frame_000_delay-0.067s.webp
        new_filename = f"frame_{frame_idx:03d}_delay-0.067s.webp"
        
        src_path = os.path.join(src_dir, filename)
        dest_path = os.path.join(dest_dir, new_filename)
        
        try:
            with Image.open(src_path) as img:
                # Convert RGBA to RGB if necessary, WebP supports transparency but RGB is smaller if solid background
                # We will keep RGBA if it has transparency, but we can save directly as webp
                img.save(dest_path, "WEBP", quality=80)
            converted_count += 1
            if converted_count % 20 == 0:
                print(f"Converted {converted_count} files...")
        except Exception as e:
            print(f"Error converting {filename}: {e}")
            
    print(f"Successfully converted {converted_count} files to WebP in {dest_dir}.")

if __name__ == "__main__":
    main()
