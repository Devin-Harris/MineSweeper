$(document).ready(() => {

    $('#End_Overlay').hide();
    $('#endBtns').hide();

    $(document).on('keydown', (e) => {
        if (e.which == 32) {
            StartNewGame();
        }
    });

    //Add event listeners to home screen
    $('#ruleIcon').on('click', (e) => {
        if (e.currentTarget.children[0].classList[0] == "ruleClose") {
            $('#ruleIcon div').addClass('ruleOpen');
            $('#ruleIcon div').removeClass('ruleClose');
            $('#Rules').slideDown();
        } else {
            $('#ruleIcon div').addClass('ruleClose');
            $('#ruleIcon div').removeClass('ruleOpen');
            $('#Rules').slideUp();
        }
    });

    //Add event listeners to btns
    $('.btn-reset').on('click', () => { ResetFlags() });
    $('.btn-play').on('click', () => { StartNewGame() });
    $('.btn-quit').on('click', () => { GameOver('Quit') });

    
});

//Global Variable for all pieces
let Pieces = [];
let BombIndexs = [];
let totalBombs = 15;
let Time = 0;
let Score_Increment_Interval;

function StartNewGame() {

    //Hide Intro / End screens
    $('#Intro_Screen').slideUp();
    $('#End_Screen').slideUp();
    $('#End_Overlay').slideUp();

    //Make sure Pieces starts empty then fill with objects
    Pieces = [];
    BombIndexs = [];
    FlagsTotal = totalBombs;
    FlagsLeft = FlagsTotal;
    Time = 0;
    ProgressVar = 0;
    clearInterval(Score_Increment_Interval);
    $('#Progress_Circle').css({
        background: ``,
    });
    $('#Rules').slideUp();
    MakeBombIndexs();
    FillPieceArray();

    //Make sure Piece Container is empty at first then fill with pieces
    $('#Piece_Container').html('');
    FillPieceContainer();

    //Add event listeners to Pieces
    $('.Piece').on('click', (e) => { PieceLeftClick(e) });
    $('.Piece').on('contextmenu', (e) => { PieceRightClick(e) });

    //Fill info
    $('#FlagsLeft').text(FlagsLeft);
    $('#FlagsTotal').text(FlagsTotal);
    $('#Time').text('000');
    Score_Increment_Interval = setInterval(redrawScore, 1000);

}

function MakeBombIndexs() {

    for (let i = 0; i < totalBombs; ++i) {
        let bombDuplicate = false;
        do {
            bombDuplicate = false;
            let BombIndex = Math.floor(Math.random() * 108);

            for (let j = 0; j < BombIndexs.length; ++j) {
                if (BombIndex == BombIndexs[j]) {
                    bombDuplicate = true;
                }
            }

            if (!(bombDuplicate)) {
                BombIndexs.push(BombIndex);
            }

        } while (bombDuplicate);
        
    }

}

function FillPieceArray() {

    for (let i = 0; i < 9; ++i) {   //Row Number
        for (let j = 0; j < 12; ++j) {  //Column Number
            let Piece = { index: (i * 12) + j, Row: i, Col: j, surroundingBombs: -1, isBomb: false, visible: false, isFlag: false};

            BombIndexs.forEach(bombIndex => {
                if (bombIndex == (i * 12) + j) {
                   Piece.isBomb = true;
                }
            });

            Pieces.push(Piece);
        }
    }

    Pieces.forEach(Piece => {
        Piece.surroundingBombs = GetSurroundingBombs(Piece.index);

        //Make sure no piece can have over 5 bombs around it
        if (Piece.surroundingBombs >= 5) {
            StartNewGame();
        }
    })

}

function FillPieceContainer() {

    Pieces.forEach(Piece => {
        let elm = document.createElement('div');
        elm.classList.add('Piece');
        elm.classList.add(`Piece-${Piece.index}`);

        // Show Bomb location for testing
        // if(Piece.isBomb) {
        //     elm.classList.add(`Style-Bomb`);
        // }

        $('#Piece_Container').append(elm);
    });

}

function GetSurroundingBombs(PieceIndex) {

    let surroundingBombs = 0;
    let currPiece = Pieces[PieceIndex];

    Pieces.forEach((Piece, index) => {
        if (((Piece.Row - 1) == currPiece.Row) && (Piece.Col == currPiece.Col) && (Piece.Row != 0) && Piece.isBomb) {
            ++surroundingBombs;
        }
        if (((Piece.Row + 1) == currPiece.Row) && (Piece.Col == currPiece.Col) && (Piece.Row != 11) && Piece.isBomb) {
            ++surroundingBombs;
        }
        if ((Piece.Row == currPiece.Row) && ((Piece.Col - 1) == currPiece.Col) && (Piece.Col != 0) && Piece.isBomb) {
            ++surroundingBombs;
        }
        if ((Piece.Row == currPiece.Row) && ((Piece.Col + 1) == currPiece.Col) && (Piece.Col != 11) && Piece.isBomb) {
            ++surroundingBombs;
        }
        if (((Piece.Row - 1) == currPiece.Row) && ((Piece.Col - 1) == currPiece.Col) && (Piece.Col != 0) && (Piece.Row != 0) && Piece.isBomb) {
            ++surroundingBombs;
        }
        if (((Piece.Row + 1) == currPiece.Row) && ((Piece.Col + 1) == currPiece.Col) && (Piece.Col != 11) && (Piece.Row != 11) && Piece.isBomb) {
            ++surroundingBombs;
        }
        if (((Piece.Row - 1) == currPiece.Row) && ((Piece.Col + 1) == currPiece.Col) && (Piece.Col != 11) && (Piece.Row != 0) && Piece.isBomb) {
            ++surroundingBombs;
        }
        if (((Piece.Row + 1) == currPiece.Row) && ((Piece.Col - 1) == currPiece.Col) && (Piece.Col != 0) && (Piece.Row != 11) && Piece.isBomb) {
            ++surroundingBombs;
        }
    })


    return surroundingBombs;
}


