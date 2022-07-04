function buildTable(url) {
    fetch(url)
    .then(response => response.json())
    .then(serverList => {
        let table = document.querySelector('.mainTable');
        table.innerHTML = '';
        table.innerHTML = '<tr><th>Server Name</th><th>Rank</th><th>Players</th><th>Last Wipe</th><th>Country</th></tr>';

        for (let item in serverList.data) {
            console.log(serverList.data[item]);
            let row = document.createElement('tr');

            let serverName = document.createElement('td');
            serverName.innerHTML = `${serverList.data[item].attributes.name}`;
            serverName.setAttribute('data-label', 'Name');

            let serverRank = document.createElement('td');
            serverRank.innerHTML = `${serverList.data[item].attributes.rank}`;
            serverRank.setAttribute('data-label', 'Rank');

            let serverPlayers = document.createElement('td');
            serverPlayers.innerHTML = `${serverList.data[item].attributes.players}/${serverList.data[item].attributes.maxPlayers}`;
            serverPlayers.setAttribute('data-label', 'Players');

            let serverWipe = document.createElement('td');
            let currentTime = new Date();
            let wipeTimeString = `${serverList.data[item].attributes.details.rust_last_wipe}`;
            let wipeTime = new Date(wipeTimeString);
            let daysWiped = (currentTime.getDate() - wipeTime.getDate());
            let wipeMessage = `${daysWiped} Days ago`;
            serverWipe.innerHTML = `${wipeMessage}`;
            serverWipe.setAttribute('data-label', 'Last Wiped');

            let serverCountry = document.createElement('td');
            serverCountry.innerHTML = `${serverList.data[item].attributes.country}`;
            serverCountry.setAttribute('data-label', 'Country');

            let joinButton = document.createElement('td');
            joinButton.innerHTML = `<a href='steam://connect/${serverList.data[item].attributes.ip}:${serverList.data[item].attributes.port}'>Join</a>`;
            joinButton.className = 'connect';

            row.appendChild(serverName);
            row.appendChild(serverRank);
            row.appendChild(serverPlayers);
            row.appendChild(serverWipe);
            row.appendChild(serverCountry);
            row.appendChild(joinButton);

            table.appendChild(row);

        }
    })
}
const searchInput = document.querySelector('#search');
const minInput = document.querySelector('#min');
const maxInput = document.querySelector('#max');

document.querySelector('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const url = new URL(`https://api.battlemetrics.com/servers?page[size]=100&filter[game]=rust`);

    if (searchInput.value !== '') {
        url.searchParams.set('filter[search]=', searchInput.value);
    }
    if (minInput.value !== '') {
        url.searchParams.set('filter[players][min]=', minInput.value);
    }
    if (maxInput.value !== '') {
        url.searchParams.set('filter[players][max]=', maxInput.value);
    }

    buildTable(url);
    
})

buildTable(`https://api.battlemetrics.com/servers?page[size]=100&filter[game]=rust`);
