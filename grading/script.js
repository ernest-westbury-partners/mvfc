function _ifElementExists(selector, callback) {
    if ($(selector).length > 0) {
        callback()
    }
}

function _ifElementDoesNotExist(selector, callback) {
    if ($(selector).length < 1) {
        callback()
    }
}

function _ifElementHasChild(parentElement, childSelector, callback) {
    if ($(parentElement).find(childSelector).length > 0) {
        callback();
    }
}

function _ifElementHasNoChild(parentElement, childSelector, callback) {
    if ($(parentElement).find(childSelector).length < 1) {
        callback();
    }
}

$(document).ready(function () {
    initBodyClasses();
    initTableSelect();
})

function initBodyClasses() {
    const url = window.location.pathname;
    console.log(url)

    function addBodyId(idStr) {
        $('body').attr('id', idStr)
    }

    if (url.includes('/home')) {
        addBodyId('home');
        modifyHomePage();
    } else if (url.includes('/register')) {
        addBodyId('register');
        modifyRegisterPage();
    } else if (url.includes('/overviewGrades')) {
        addBodyId('overview-grades');
    } else {

    }
}

function appendFooter() {
    _ifElementExists('#footer', () => {
        console.log('#footer element already exists.')
    })

    _ifElementDoesNotExist('#footer', () => {

        $('body').append(`
        <div id="footer">
            <div>
                Manly Vale Football Club is a registered non-profit organisation run by volunteers for our community.
            </div>

            <div>
                Our club acknowledges that we play on the land of the Gayemagal and Garigal people. We wish to pay respect
                to all Elders – past, present and future.
            </div>

            <div>
                © Manly Vale Football Club 2026
            </div>
        </div>
    `)

    })

}

function modifyHomePage() {

    $('#content').remove()
    $('#home>a').remove()

    $('body').prepend(`
        <div id="content">
            <div class="logo-container">
                <a href="/">
                    <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                </a>

                <h3>
                    Celebrating <strong>75 years</strong> of football with our community
                </h3>
            </div>

            <div class="actions">
                <a onclick="playerLookupCheckIn()" class="btn custom-btn">Check In</a>
                <a onclick="registerNewPlayer()" class="btn custom-btn">Register</a>
            </div>

        </div>
    `)

    appendFooter();
}

function modifyRegisterPage() {
    $('h3').each(function () {
        const h3 = $(this)

        $(this).remove();
    })


    appendFooter();
}

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
