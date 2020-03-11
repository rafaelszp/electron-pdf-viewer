
window.addEventListener('load', () => {
    var btnDownload = document.getElementById('download_open');
    var btnPrint = document.getElementById('printpdf');
    var btnPrint = document.getElementById('printpdf');

    btnDownload.addEventListener('click', (e) => {
        const filename = document.getElementById('documentName').innerHTML;
        window.parent.openTempFolder(filename);
    });

    btnPrint.addEventListener('click', (e) => {
        const filename = $(location).attr("href").replace(/.*?file:\/\//gi,'');
        window.parent.printPDF({ filename });
    });

});

$(document).ready(() => {
    console.clear();
    const canvas = $('#canvasContainer');

    $('#zoomOut').click(() => {
        let zoom = parseFloat(canvas.css('zoom')) * 0.9;
        canvas.css('zoom', `${zoom}`);
    });
    $('#zoomIn').click(() => {
        let zoom = parseFloat(canvas.css('zoom')) * 1.1;
        canvas.css('zoom', `${zoom}`);
    });
    $('#scaleSelect').on('change', (e) => {
        canvas.css('zoom', `${e.target.value}`);
    });
    const newPage = $("#pageNumber");

    newPage.keyup((e) => {
        if (e.which == 13) {
            const page = e.target.value;
            newPage.val(page);
            scrollTo(page, canvas);
        }
    });

    $('#previous').click(() => {
        const page = parseInt(newPage.val()) - 1;
        scrollTo(page, canvas);
    });
    $('#next').click(() => {
        const page = parseInt(newPage.val()) + 1;
        scrollTo(page, canvas);
    });

    canvas.on('wheel', (e) => {
        if (e.ctrlKey) {
            const mult = e.originalEvent.wheelDelta > 0 ? 1.1 : 0.9;
            const curz = parseFloat(canvas.css('zoom'));
            const zoom = curz * mult;
            canvas.css('zoom', `${zoom}`);
        }
    });
});

function scrollTo(page, canvas) {
    const scrollEl = `#textLayer${page}`;
    if ($(scrollEl).length) {
        canvas.css('display','none')
        canvas.animate({
            scrollTop: $('#textLayer1').offset().top
        }, 1, () => {
            canvas.css('display','block')
            canvas.animate({
                scrollTop: $(scrollEl).offset().top
            }, 200);
        });
    }
}

