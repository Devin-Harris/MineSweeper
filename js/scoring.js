async function GameOver(result) {
    
    $('.Piece').off();
    clearInterval(Score_Increment_Interval);

    ShowAllPieces();
    await delay(3000);

    if (result == 'Lost') {

        $('#End_Overlay').show();
        $('#End_Screen').show();
        await delay(10);
        $('#End_Info h4').text('Oh no! You exploded a bomb!');
        $('#End_Info #Timer_Indicator p').text($('#Time').text());
        $('#End_Info #Timer_Indicator i').css({ backgroundImage: 'url(../assets/clockRed.svg)'});
        $('#End_Info').slideDown();
        $('#endBtns').slideDown();

    } else if (result == 'Won') {

        $('#End_Overlay').show();
        $('#End_Screen').show();
        await delay(10);
        $('#End_Info h4').text('Congrats! You found all the bombs!');
        $('#End_Info #Timer_Indicator p').text($('#Time').text());
        $('#End_Info #Timer_Indicator i').css({ backgroundImage: 'url(../assets/clockGreen.svg)' });
        $('#End_Info').slideDown();
        $('#endBtns').slideDown();

    } else if (result == 'Quit') {

        $('#Intro_Screen').slideDown();
        $('#endBtns').slideUp();

    }

}

const delay = ms => new Promise(res => setTimeout(res, ms));

function ShowAllPieces() {
    Pieces.forEach((Piece, index) => {

        if (Piece.isFlag) {
            $(`.Piece-${index}`).removeClass(`Style-Flag`);
            $(`.Piece-${index}`).html('');
            Pieces[index].visible = false;
        }

        if (Piece.isBomb || Piece.isFlag) {
            FillPiece(index);
        }

        if (!(Piece.isFlag) && !(Piece.isBomb)) {
            $(`.Piece-${index}`).removeClass(`Style-${Pieces[index].surroundingBombs}`);
            $(`.Piece-${index}`).html('');
            Pieces[index].visible = true;
        }

    });
}


let FlagsLeft = totalBombs;
let FlagsTotal = totalBombs;
function redrawFlags() {
    $('#FlagsLeft').text(FlagsLeft);
}

function redrawScore() {
    Time += 1;
    if (Time < 10) {
        $('#Time').text('00' + Time);
    } else if (Time < 100) {
        $('#Time').text('0' + Time);
    } else if (Time <= 1000) {
        $('#Time').text(Time);
    } else {
        $('#Time').text('1000+');
        clearInterval(Score_Increment_Interval);
    }
}

let ProgressVar = 0;
function FullBoardCheck() {

    ProgressVar = 0;

    Pieces.forEach((Piece, index) => {
        if (Piece.visible) {
            ++ProgressVar;
        }
    });

    UpdateProgressBar(ProgressVar);

    if (ProgressVar == Pieces.length) {
        GameOver('Won');
    }

}

function UpdateProgressBar(ProgressVar) {

    let Progress_Percent = (ProgressVar / 108) * 100;

    $('#Progress_Circle').css({
        background: `linear-gradient(180deg, white ${90 - Progress_Percent}%, #6AFDB8 ${90 - Progress_Percent}%)`,
    });

}