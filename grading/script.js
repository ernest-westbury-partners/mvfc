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

function _ifElementContainsText(selector, text, callback) {
    const _text = $(selector).text()
    if (_text && _text.toLowerCase().includes(text.toLowerCase())) {
        callback()
    }
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
                    _ifElementExists('form#newPlayer', () => {
                        $('body').attr('id', 'register')
                        prependRegistrationForm()
                    })

                    _ifElementDoesNotExist('form#newPlayer', () => {
                        $('body').attr('id', 'home')
                    })

                    _ifElementContainsText('#content', 'Successfully registered', () => {
                        $('#content').remove()
                        _prependIfElementDoesNotExist('#content', `
                        <div id="content">
                            <div class="register-success">
                                <div class="logo-container">
                                    <a href="/">
                                        <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
                                    </a>
                                </div>
                                Successfully registered, please check in with a Coordinator.<br>Let them know player name and group.
                            </div>
                        </div>
                        `)
                    })

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
        $('body').prepend(htmlStr)
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
            <a href="/">
                <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
            </a>

            <h3>
                Celebrating <strong>75 years</strong> of football with our community
            </h3>
        </div>
    `)
}

function prependRegistrationForm() {
    $('#content').remove()
    _prependIfElementDoesNotExist('#content', `<div id="content">
    <div class="left">
        <div class="logo-container">
            <a href="/">
                <img width="150px" class="center mvfc-logo" src="https://westbury-partners-mvfc-grading.s3.ap-southeast-1.amazonaws.com/img/MVFC-Logo-White.svg" alt="Manly Vale FC">
            </a>

            <h3>
                Celebrating <strong>75 years</strong> of football with our community
            </h3>
        </div>
    </div>
    <div class="right">
        <form id="newPlayer" method="POST" action="">
            <div class="form-card">
                <h1 class="form-title">New Player Registration</h1>

                <div class="form-group">
                    <label for="valName">Player Name*</label>
                    <input type="text" name="valName" id="valName" maxlength="255">
                </div>

                <div class="form-group">
                    <label for="valParentName">Guardian Name*</label>
                    <input type="text" name="valParentName" id="valParentName" maxlength="255">
                </div>

                <div class="form-group">
                    <label for="telMobile">Mobile*</label>
                    <input type="text" name="telMobile" id="telMobile" maxlength="30">
                </div>

                <div class="form-group">
                    <label for="emlEmail">Email</label>
                    <input type="text" name="emlEmail" id="emlEmail" maxlength="255">
                </div>

                <div class="form-group">
                    <label for="group_id">Select Group</label>
                    <select name="group_id" id="group_id">
                        <option value="0" selected="selected"></option>
                        <option value="6">Female U9s</option>
                        <option value="7">Mixed U9s</option>
                        <option value="8">Female U10s</option>
                        <option value="9">Mixed U10s</option>
                        <option value="10">Female U11s</option>
                        <option value="11">Mixed U11s</option>
                        <option value="12">Female U12s</option>
                        <option value="13">Mixed U12s</option>
                        <option value="14">Female U13s</option>
                        <option value="15">Mixed U13s</option>
                        <option value="16">Female U14s</option>
                        <option value="17">Mixed U14s</option>
                        <option value="18">Female U15s</option>
                        <option value="19">Mixed U15s</option>
                        <option value="20">Mixed U16s</option>
                        <option value="21">Female U18s</option>
                        <option value="22">Mixed U18s</option>
                        <option value="23">Mixed U21s</option>
                        <option value="24">Female U99s</option>
                        <option value="25">Mixed U99s</option>
                        <option value="26">Mixed U100s</option>
                    </select>
                </div>

                <div class="form-group">
                    <a onclick="saveNewPlayer()" class="btn custom-btn">Register New Player</a>
                </div>
            </div>
        </form>
    </div>
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
    prependRegistrationForm();
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
