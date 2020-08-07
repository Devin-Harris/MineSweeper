let ClosePieces = [];
let EmptyChecking = true;
let LoopLength = 0;

//Show the empty pieces touching the initialy marked empty piece
function EmptyShow(PieceIndex) {

    //Set close empty pieces to nothing
    ClosePieces = [];

    //Initialize the length of the CLose pieces array
    LoopLength = CheckAroundPiece(PieceIndex);

    //While the array is being added to, update the length of the array
    while (EmptyChecking) {
        LoopLength = LoopThroughClosePieces(LoopLength);
    }

    //Once array is fixed size, add the empty classes and visible attributes to the pieces that are in the array
    ClosePieces.forEach(index => {
        $(`.Piece-${index}`).addClass(`Style-${Pieces[index].surroundingBombs}`);
        Pieces[index].visible = true;
    })

}

//Find all pieces in 3x3 grid around pieces in array
function LoopThroughClosePieces(LoopLength) {

    for (let i = 0; i < LoopLength; ++i) {
        //Update looplength if pieces are added once 3x3 check is done around all pieces
        LoopLength = CheckAroundPiece(ClosePieces[i]);
    }

    return LoopLength;
}

function CheckAroundPiece(PieceIndex) {

    let currPiece = Pieces[PieceIndex];
    let currRow = currPiece.Row;
    let currCol = currPiece.Col;
    let ClosePiecesLen = ClosePieces.length;

    //Check 3x3 grid around each piece
    Pieces.forEach((Piece, index) => {
        if (((Piece.Row - 1) == currRow) && (Piece.Col == currCol) && (Piece.Row != 0) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array
        }
        if (((Piece.Row + 1) == currRow) && (Piece.Col == currCol) && (Piece.Row != 11) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array
        }
        if ((Piece.Row == currRow) && ((Piece.Col - 1) == currCol) && (Piece.Col != 0) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array
        }
        if ((Piece.Row == currRow) && ((Piece.Col + 1) == currCol) && (Piece.Col != 11) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array
        }
        if (((Piece.Row - 1) == currRow) && ((Piece.Col - 1) == currCol) && (Piece.Row != 0) && (Piece.Col != 0) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array
        }
        if (((Piece.Row + 1) == currRow) && ((Piece.Col + 1) == currCol) && (Piece.Row != 11) && (Piece.Col != 11) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array
        }
        if (((Piece.Row - 1) == currRow) && ((Piece.Col + 1) == currCol) && (Piece.Row != 0) && (Piece.Col != 11) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array 
        }
        if (((Piece.Row + 1) == currRow) && ((Piece.Col - 1) == currCol) && (Piece.Row != 11) && (Piece.Col != 0) && !(Piece.visible)) {
            addArrayCheck(index); //Make sure index isnt already in array
        }
    });

    //If nothing has been added to array, stop changing Length of array and apply styles
    if (ClosePieces.length == ClosePiecesLen) {
        EmptyChecking = false;
    }

    return ClosePieces.length;

}

function addArrayCheck(index) {

    let addtoArray = false;

    //If index is already in array, dont add it
    addtoArray = ClosePieces.find(priorIndex => index == priorIndex);
    if (!(addtoArray) && Pieces[index].surroundingBombs == 0) {
        ClosePieces.push(index);
    }

    //If piece in 3x3 grid isnt empty show it
    if (Pieces[index].surroundingBombs != 0) {
        FillPiece(index);
    }
}