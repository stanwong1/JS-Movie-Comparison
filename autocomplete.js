const createAutoComplete  = ({ 
    root, 
    renderOption, 
    onOptionSelect, 
    inputValue,
    fetchData
}) => {
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
             <div class="dropdown-content results">
             </div>
        </div>
    </div>    
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    //pulls API data once user stops typing for  1 second 
    const onInput = async event => {
        const items = await fetchData(event.target.value);

        //if there are no items, the dropdown window removes
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        // allows the resultsWrapper to refresh aftr every search
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            //removes classlist after 'click' on an anchor tag
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                //'click' title becomes in the input value 
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('input', debounce(onInput, 500));

    //when click outside of the root, the dropdown removes the 'is-active' and the dropdown closes!
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};