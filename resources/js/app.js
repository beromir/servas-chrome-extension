document.addEventListener('DOMContentLoaded', () => {
    const addLinkBtn = document.getElementById('add-link-btn');
    const optionsBtn = document.getElementById('options-btn');

    addLinkBtn.addEventListener('click', async () => {
        let currentTab = '';

        await getCurrentTab().then(value => {
            currentTab = value;
        });

        sendRequest(currentTab);
    });

    optionsBtn.addEventListener('click', () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('view/options.html'));
        }
    });
});

async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function sendRequest(tab) {
    let data = {link: tab.url, title: tab.title};
    let storageData = null;

    await chrome.storage.sync.get({
        servasUrl: '',
        apiToken: '',
    }).then(value => {
        storageData = value;
    });

    if ((storageData.servasUrl === '') || (storageData.apiToken === '')) {
        showResponseMessage('wrong settings');
        return;
    }

    fetch(`${storageData.servasUrl}/api/links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storageData.apiToken}`,
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                showResponseMessage('ok');
            } else {
                showResponseMessage('error');
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function showResponseMessage(response) {
    const responseMessage = document.getElementById('response-message');

    const removeClassHidden = () => {
        responseMessage.classList.remove('hidden');
    };

    const changeTextColor = (colorClass) => {
        responseMessage.classList.add(colorClass);
    };

    switch (response) {
        case 'ok':
            responseMessage.innerText = 'The link was added!';
            changeTextColor('text-green-300');
            removeClassHidden();
            break;
        case 'error':
            responseMessage.innerText = 'There was an error!';
            changeTextColor('text-red-400');
            removeClassHidden();
            break;
        case 'wrong settings':
            responseMessage.innerText = 'Check the settings!';
            changeTextColor('text-red-400');
            removeClassHidden();
            break;
    }
}
