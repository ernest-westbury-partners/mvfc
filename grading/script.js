$(document).ready(function () {
    initTableSelect();
})

function initTableSelect() {
    $('table').hide()
    $('.table-select').each(function () {
        $(this).find('h3').click(function () {
            var target = $(this).data('target')
            var title = $(this).text()
            $('h3').removeClass('active')
            $(this).addClass('active')
            $('table').hide()
            $(`#${target}`).show()

            $('#title').text(title)
        })
    })

    $('h3:first-child').click()
}