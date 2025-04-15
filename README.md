# Photoshop Artboard Slicer Script

This script allows you to slice a Photoshop document into multiple parts and either:
1. Export the slices as JPG files with customizable quality.
2. Add the slices to a new Photoshop document with multiple artboards.

## Features
- **Customizable Slice Width**: Specify the width of each slice in pixels.
- **Export Options**:
  - Export slices as JPGs with adjustable quality (1–12).
  - Add slices to a new document with artboards.
- **Dynamic Artboard Naming**: Automatically names artboards based on user input.

## Installation
1. Save the script file as `PSSlice.jsx`.
2. Place the script in Photoshop's **Scripts** folder:
   - **Windows**: `C:\Program Files\Adobe\Adobe Photoshop [Version]\Presets\Scripts`
   - **Mac**: `/Applications/Adobe Photoshop [Version]/Presets/Scripts`
3. Restart Photoshop.
4. Access the script from **File > Scripts > PSSlice**.

## Usage
1. Open a document in Photoshop.
2. Run the script from **File > Scripts > PSSlice**.
3. A dialog box will appear with the following options:
   - **Base Name for Artboards/Slices**: Enter a name for the slices or artboards.
   - **Slice Width (px)**: Specify the width of each slice in pixels.
   - **Export Options**:
     - **Export as JPGs**: Save slices as JPG files.
     - **Add to Artboards**: Add slices to a new document with artboards.
   - **JPG Quality (1–12)**: Adjust the quality of the exported JPGs (only enabled if "Export as JPGs" is selected).
4. Click **OK** to run the script or **Cancel** to exit.

## Notes
- The document width must be a multiple of the slice width.
- If exporting as JPGs, you will be prompted to select a folder to save the files.
- Artboards are automatically renamed based on the base name provided.

## Example
- **Base Name**: `Slice`
- **Slice Width**: `1080px`
- **Export Option**: Add to Artboards

Result:
- A new document with artboards named `Slice_1`, `Slice_2`, etc., each containing a slice of the original document.

## License
This script is distributed under the [MIT License](LICENSE). See the `LICENSE` file for more details.