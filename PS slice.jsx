#target photoshop

function addArtboard(name, left, top, width, height) {
    var desc = new ActionDescriptor();
    var rectDesc = new ActionDescriptor();

    rectDesc.putUnitDouble(charIDToTypeID("Top "), charIDToTypeID("#Pxl"), top);
    rectDesc.putUnitDouble(charIDToTypeID("Left"), charIDToTypeID("#Pxl"), left);
    rectDesc.putUnitDouble(charIDToTypeID("Btom"), charIDToTypeID("#Pxl"), top + height);
    rectDesc.putUnitDouble(charIDToTypeID("Rght"), charIDToTypeID("#Pxl"), left + width);

    desc.putObject(charIDToTypeID("T   "), stringIDToTypeID("artboardSection"), rectDesc);
    desc.putString(charIDToTypeID("Nm  "), name);

    var ref = new ActionReference();
    ref.putClass(stringIDToTypeID("artboardSection"));
    desc.putReference(charIDToTypeID("null"), ref);

    executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);

    // Move the artboard to the correct position
    var moveDesc = new ActionDescriptor();
    var moveRef = new ActionReference();
    moveRef.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    moveDesc.putReference(charIDToTypeID("null"), moveRef);

    var offsetDesc = new ActionDescriptor();
    offsetDesc.putUnitDouble(charIDToTypeID("Hrzn"), charIDToTypeID("#Pxl"), - 100); // Move left by -100px
    offsetDesc.putUnitDouble(charIDToTypeID("Vrtc"), charIDToTypeID("#Pxl"), top);       // Vertical position remains unchanged
    moveDesc.putObject(charIDToTypeID("T   "), charIDToTypeID("Ofst"), offsetDesc);

    executeAction(charIDToTypeID("move"), moveDesc, DialogModes.NO);
}

function renameArtboards(baseName) {
    var layerSets = app.activeDocument.layerSets; // Access artboards and groups
    var artboardIndex = 1; // Start numbering artboards from 1

    for (var i = 0; i < layerSets.length; i++) {
        if (layerSets[i].artboard) { // Check if the layer set is an artboard
            layerSets[i].name = baseName + "_" + artboardIndex;
            artboardIndex++;
        }
    }
}

function createArtboardsFromSlices() {
    if (app.documents.length === 0) {
        alert("No document open.");
        return;
    }

    var sourceDoc = app.activeDocument;
    var sliceWidth = 1080;
    var totalSlices = sourceDoc.width / sliceWidth;
    // var totalSlices = 3;

    if (sourceDoc.width % sliceWidth != 0 ) {
        alert("Document must be a multiple of slice width " + (sliceWidth) + "px wide.");
        return;
    }

    var baseName = prompt("Enter a base name for the artboards:", "Slice");
    if (!baseName) {
        alert("No name entered. Operation canceled.");
        return;
    }

    var originalUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;

    // Create an artboard document with the size of one slice
    var newDoc = app.documents.add(
        sliceWidth,
        sourceDoc.height,
        sourceDoc.resolution,
        baseName,
        NewDocumentMode.RGB,
        DocumentFill.TRANSPARENT,
        1,
        BitsPerChannelType.EIGHT,
        "artboard"
    );

    // Rename the initial artboard
    newDoc.activeLayer.name = baseName+"_1";

    for (var i = 0; i < totalSlices; i++) {
        var xStart = i * sliceWidth;
        var xEnd = xStart + sliceWidth;

        // Duplicate source, crop, copy merged
        var sliceDoc = sourceDoc.duplicate(baseName+"_" + (i + 1), false);
        sliceDoc.crop([
            UnitValue(xStart, "px"),
            UnitValue(0, "px"),
            UnitValue(xEnd, "px"),
            UnitValue(sourceDoc.height, "px")
        ]);

        sliceDoc.selection.selectAll();
        sliceDoc.selection.copy(true);
        sliceDoc.close(SaveOptions.DONOTSAVECHANGES);

        app.activeDocument = newDoc;


        addArtboard("Slice_" + (i + 1), xStart, 0, sliceWidth, sourceDoc.height);

        newDoc.activeLayer = newDoc.layers[0];

        // centerViewportOn(xStart + (sliceWidth / 2), sourceDoc.height / 2);
        // app.runMenuItem(stringIDToTypeID('actualPixels')); // 100% zoom
        app.runMenuItem(stringIDToTypeID('fitOnScreen'));
        
        // alert(xStart)
        // Paste slice into the active artboard
        var pastedLayer = newDoc.paste();

        // Ensure the pasted content is aligned with the artboard
        pastedLayer.translate(0, 0); // Align horizontally based on xStart
    }

    // Rename artboards after creation
    renameArtboards(baseName);

    app.preferences.rulerUnits = originalUnits;
    alert("Done: " + totalSlices + " artboards created.");
}

createArtboardsFromSlices();
