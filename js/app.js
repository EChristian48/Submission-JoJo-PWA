class Program {
    static main () {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
        loadNav();
    
        async function loadNav() {
            try {
                const response = await fetch('/nav/nav.html');
                const responseText = await response.text();
    
                if (response.status == 200) {
                    const sidenav = document.querySelector('.sidenav');
                    const topnav = document.querySelector('.topnav');
    
                    let sidenavBackground;
                    try {
                        const sidenavResponse = await fetch('/nav/sidenav.html');
                        sidenavBackground = await sidenavResponse.text();
                    } catch (error) {
                        console.error(error);
                    }
    
                    sidenav.innerHTML = sidenavBackground + responseText;
                    topnav.innerHTML = responseText;
    
                    for (const elem of document.querySelectorAll('.topnav a, .sidenav a, .brand-logo')) {
                        elem.addEventListener('click', (e) => {
                            M.Sidenav.getInstance(sidenav).close();
    
                            let page = e.target.getAttribute('href').substr(1);
                            if (page === '') {
                                page = 'jonathan';
                            }
                            loadPage(page);
                        })
                    }
                } else {
                    throw Error(`Cannot connect: ${response.status}, ${response.statusText}`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        let page = window.location.hash.substr(1);
        if (page == '') {
            page = 'jonathan';
        }
        loadPage(page);
    
        async function loadPage(pageString, callback=null) {
            try {
                const response = await fetch(`/pages/${pageString}.html`);
                const responseText = await response.text();
                const content = document.querySelector('#body-content');
    
                if (response.status == 200) {
                    content.innerHTML = responseText;
                } else if (response.status == 404){
                    content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
                } else {
                    content.innerHTML = '<p>Halaman tidak dapat diakses.</p>';
                }
    
                if (callback != null) {
                    callback();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}