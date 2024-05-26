const dictTxts = new Map([['txt_meme', 'мемы для страданий'], ['txt_time', '09:52'], ['txt_img_type', 'Photo'], ['txt_msg_count', '131']]);
const attrImgs = new Map([['img_item_photo', './img/cat_angry.png'], ['img_chat_foto', './img/suffering.jpg']]);

document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Start');

    const cardChat = createGroupChat(document.querySelector('main#chat'));
    cardChat(dictTxts.values());
})

const createTag = (nameElement, nameStyle) => {
    let element = document.createElement(nameElement);
    element.className = nameStyle;

    return element;
}

const insertTxtNode = (element, txt) => {
    element.insertBefore(document.createTextNode(txt), element.firstElementChild)
}

const createTagDict = (nameTag, classNames) => {
    let dictElement = new Map();

    for(let _className of classNames){
        dictElement.set(_className, createTag(nameTag, _className));
    }

    return dictElement;
}

const setImgAttr = (elemtn, src, alt = 'logo') => {
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
}

const createGroupChat = (element) => {
    const divTagClassNames = ['item_photo', 'item_txt', 'item_meme_name', 'item_flex_row', 'item_meme_date', 'chat_photo', 'msg_count'];
    const pTagClassNames = dictTxts.keys();
    const imgTagClassNames = attrImgs.keys();

    // console.log(element);

    return (dictTxts) => {

        console.log(dictTxts);

        const dictDivs = createTagDict('div', divTagClassNames);
        dictDivs.get('item_meme_name').className += ' item_flex_row space_between';

        const dictP = createTagDict('p', pTagClassNames);
        const dictImg = createTagDict('img', imgTagClassNames);

        for(let  _className of imgTagClassNames){
            setImgAttr(dictImg.get(_className), attrImgs.get(_className));
        }

        let icon_volume_off = createTag('i', 'user-icon_volume-off');
        icon_volume_off.className += ' material-icons';
        insertTxtNode(icon_volume_off, 'volume_off');

        for(_className of pTagClassNames){
            insertTxtNode(dictp.get(_className), dictTxts.get(_className));
        }

        
    }
}