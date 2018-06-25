(function () {
    function ready() {

        class SkuConvertData {

            constructor(sectionNodes) {
                this.sectionNode = sectionNodes;
                let sectionNode = this.sectionNode;
                this.activeTabActionType = sectionNode.dataset.type;
                this.clearDataButton = sectionNode.getElementsByClassName('js-data-clear-button')[0];
                if (this.activeTabActionType !== 'create') {
                    this.currentItemsList = sectionNode.getElementsByClassName('js-current-list')[0];
                }
                this.items = sectionNode.getElementsByClassName('js-items-import')[0];
                this.buttonCreateSale = sectionNode.getElementsByClassName('js-create-sale-button')[0];
                this.buttonCreateShield = sectionNode.getElementsByClassName('js-create-shields-button')[0];
                this.copyListButton = sectionNode.getElementsByClassName('js-copy-list-button')[0];
                this.newItemsList = sectionNode.getElementsByClassName('js-new-items-list')[0];
                const GRAY_COLOR = '#f7f7f7';
                const LIMEGREEN_COLOR = '#32CD32';
                this.buttonCreateSale.addEventListener('click', () => {
                    this.itemsArr = this.items.value.trim().split(`\n`);
                    const symbolAct = ',';
                    this.convertDataType(this.activeTabActionType, symbolAct);
                    this.copyListButton.style.backgroundColor = GRAY_COLOR;
                });

                this.buttonCreateShield.addEventListener('click', () => {
                    this.itemsArr = this.items.value.trim().split(`\n`);
                    const symbolAct = ';';
                    this.convertDataType(this.activeTabActionType, symbolAct);
                    this.copyListButton.style.backgroundColor = GRAY_COLOR;
                });

                this.copyListButton.addEventListener('click', () => {
                    this.newItemsList.select();
                    document.execCommand('Copy');
                    this.copyListButton.style.backgroundColor = LIMEGREEN_COLOR;
                });

                this.clearDataButton.addEventListener('click', () => {
                    this.newItemsList.value = '';
                    this.items.value = '';
                    if (this.activeTabActionType !== 'create') {
                        this.currentItemsList.value = '';
                    }
                    this.copyListButton.style.backgroundColor = GRAY_COLOR;
                });
            }

            convertDataType(activeTabActionType, typeButton) {
                switch (activeTabActionType) {

                    case 'create':
                        this.create(typeButton);
                        break;

                    case 'add':
                        this.add(typeButton);
                        break;

                    case 'delete':
                        this.delete(typeButton);
                        break;

                    default:
                        break;
                }
            }

            create(typeButton) {
                this.newItemsList.value = this.itemsArr.join(typeButton);
            }

            add(typeButton) {
                if (this.currentItemsList.value.search(typeButton) > 0) {
                    let itemsString = this.itemsArr.join(typeButton);
                    this.newItemsList.value = `${this.currentItemsList.value.trim()}${typeButton}${itemsString}`;
                } else {
                    this.newItemsList.value = 'Ошибка! Проверить данные';
                }
            }

            delete(typeButton) {
                if (this.currentItemsList.value.search(typeButton) > 0) {
                    let strFinalNode = this.currentItemsList.value;
                    strFinalNode = `${strFinalNode.trim()}${typeButton}`;
                    this.itemsArr.forEach(item => {
                        strFinalNode = strFinalNode.replace(new RegExp(`${item}${typeButton}`, 'g'), '')
                    });
                    this.newItemsList.value = strFinalNode.slice(0, -1);
                } else {
                    this.newItemsList.value = 'Ошибка! Проверить данные';
                }
            }

        }


        const headerMenu = document.getElementsByClassName('header-menu')[0];
        const menuItem = Array.prototype.slice.call(document.getElementsByClassName('header-menu__item'));
        let menuItemActive = document.getElementsByClassName('header-menu__item_active')[0];
        let menuItemActiveIndex = menuItemActive.dataset.menu;
        const section = Array.prototype.slice.call(document.getElementsByClassName('section'));
        let sectionActive = section[menuItemActiveIndex];
        sectionActive.classList.add('section_active');
        new SkuConvertData(sectionActive);
        headerMenu.addEventListener('click', e => {
            menuItem.forEach(item => {
                item.classList.remove('header-menu__item_active');
            });
            e.target.classList.add('header-menu__item_active');
            section.forEach(item => {
                item.classList.remove('section_active');
            });
            let menuItemActiveTab = e.target.dataset.menu;
            section[menuItemActiveTab].classList.add('section_active');
            new SkuConvertData(section[menuItemActiveTab]);
        });

    }

    window.document.addEventListener('DOMContentLoaded', ready);
})();


