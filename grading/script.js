function _elementExists(selector) {
    return $(selector).length > 0;
}

function _urlIncludes(str) {
    const url = window.location.pathname;
    return url.includes(str)
}

function isHomePage() {
    return _urlIncludes('/home')
}

function isRegisterPage() {
    return _urlIncludes('/register')
}

function isOverviewGradesPage() {
    return _urlIncludes('/overviewGrades')
}

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

function initMutationObserver() {

    const observer = new MutationObserver((mutations) => {

        for (let index = 0; index < mutations.length; index++) {
            const mutation = mutations[index];
            const target = mutation.target;
            const id = target.id;

            if (id == 'content') {
                console.log('#content updated!')

                if (isHomePage()) {
                    prependMvfcLogo()
                }
            }

        }

    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

}

$(document).ready(function () {
    initBodyClasses();
    initMutationObserver();
})

function initBodyClasses() {

    function addBodyId(idStr) {
        $('body').attr('id', idStr)
    }

    if (isHomePage()) {
        addBodyId('home');
        modifyHomePage();
    } else if (isRegisterPage()) {
        addBodyId('register');
        modifyRegisterPage();
    } else if (isOverviewGradesPage()) {
        addBodyId('overview-grades');
        modifyOverviewGradesPage();
    } else {

    }
}

function _appendIfElementDoesNotExist(selector, htmlStr) {
    _ifElementExists(selector, () => {
        console.log(`${selector} element already exists.`)
    })

    _ifElementDoesNotExist(selector, () => {
        $('body').append(htmlStr)
    })
}

function _prependIfElementDoesNotExist(selector, htmlStr) {
    _ifElementExists(selector, () => {
        console.log(`${selector} element already exists.`)
    })

    _ifElementDoesNotExist(selector, () => {
        $('body').append(htmlStr)
    })
}

function appendFooter() {
    _appendIfElementDoesNotExist('#footer', `
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
}

function prependMvfcLogo() {
    _prependIfElementDoesNotExist('.mvfc-logo', `
        <div class="logo-container">
            <a href="/home.htm">
                <!-- <img width="150px" class="center" src="coordinator_files/MVFC-Logo-1.png" alt="Manly Vale FC"> -->
                <img width="150px" class="center mvfc-logo" src="img/MVFC-Logo-White.svg" alt="Manly Vale FC">
            </a>

            <h3>
                Celebrating <strong>75 years</strong> of football with our community
            </h3>
        </div>
    `)
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

function modifyOverviewGradesPage() {
    initTableSelect();
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
