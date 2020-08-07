function PieceLeftClick(e) {

    e.preventDefault();
    let PieceIndex = e.currentTarget.classList[1].split("-")[1];

    if (Pieces[PieceIndex].isBomb) {
        GameOver('Lost');
        $('#Progress_Circle').css({
            background: `linear-gradient(180deg, #DB534C 0%, #DB534C 100%)`,
        });
    } else {
        FillPiece(PieceIndex);
        FullBoardCheck();
    }
    

}

function PieceRightClick(e) {
    e.preventDefault();
    let PieceIndex = e.currentTarget.classList[1].split("-")[1];

    if (!(Pieces[PieceIndex].visible) && FlagsLeft > 0) {
        $(`.Piece-${PieceIndex}`).addClass(`Style-Flag`);
        $(`.Piece-${PieceIndex}`).html(`<i></i>`);
        Pieces[PieceIndex].visible = true;
        Pieces[PieceIndex].isFlag = true;

        --FlagsLeft;
    } else if ((Pieces[PieceIndex].visible) && (Pieces[PieceIndex].isFlag)) {
        $(`.Piece-${PieceIndex}`).removeClass(`Style-Flag`);
        $(`.Piece-${PieceIndex}`).html('');
        Pieces[PieceIndex].visible = false;
        Pieces[PieceIndex].isFlag = false;

        ++FlagsLeft;
    }
    redrawFlags();
    FullBoardCheck();
}

function FillPiece(PieceIndex) {
    if (!(Pieces[PieceIndex].isBomb) && !(Pieces[PieceIndex].visible)) {

        if (Pieces[PieceIndex].isFlag) {

            $(`.Piece-${PieceIndex}`).addClass(`Style-Flag-Incorrect`);
            $(`.Piece-${PieceIndex}`).html(`<i></i>`);

        } else {

            $(`.Piece-${PieceIndex}`).addClass(`Style-${Pieces[PieceIndex].surroundingBombs}`);
            $(`.Piece-${PieceIndex}`).html(`<p>${Pieces[PieceIndex].surroundingBombs}</p>`);

            if (Pieces[PieceIndex].surroundingBombs == 0) {
                $(`.Piece-${PieceIndex}`).html('');
                EmptyChecking = true;
                EmptyShow(PieceIndex);
            }
            
        }

        Pieces[PieceIndex].visible = true;
    } else if (Pieces[PieceIndex].isBomb && !(Pieces[PieceIndex].visible)) {
        
        if (Pieces[PieceIndex].isFlag) {
            $(`.Piece-${PieceIndex}`).addClass(`Style-Bomb-Found`);
        } else {
            $(`.Piece-${PieceIndex}`).addClass(`Style-Bomb`);
        }

        $(`.Piece-${PieceIndex}`).html(`<i></i>`);
        Pieces[PieceIndex].visible = true;

    }

}

function ResetFlags() {

    Pieces.forEach((Piece, index) => {

        if (Piece.isFlag) {
            $(`.Piece-${index}`).removeClass(`Style-Flag`);
            $(`.Piece-${index}`).html('');
            Pieces[index].visible = false;
            Pieces[index].isFlag = false;
        }

    });

    FlagsLeft = FlagsTotal;
    redrawFlags();

}