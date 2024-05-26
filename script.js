const dictTxts = new Map([['txt_meme', 'мемы для страданий'], ['txt_time', '09:52'], ['txt_img_type', 'Photo'], ['txt_msg_count', '131']]);
const attrImgs = new Map([['img_item_photo', './img/cat_angry.png'], ['img_chat_foto', './img/suffering.jpg']]);

document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Start');

    const cardChat = createGroupChat(document.querySelector('main#chat'));
    cardChat(dictTxts);
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

const setImgAttr = (element, src, alt = 'logo') => {
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
}

const createGroupChat = (element) => {
    const divTagClassNames = ['item_photo', 'item_txt', 'item_meme_name', 'item_meme_description', 'item_flex_row', 'item_meme_date', 'chat_photo', 'msg_count'];
    const pTagClassNames = Array.from(dictTxts.keys());
    const imgTagClassNames = Array.from(attrImgs.keys());

    return (dictTxts) => {

        const dictDivs = createTagDict('div', divTagClassNames);
        dictDivs.get('item_meme_name').className += ' item_flex_row space_between';
        dictDivs.get('item_meme_description').className += ' item_flex_row';

        const dictP = createTagDict('p', pTagClassNames);
        const dictImg = createTagDict('img', imgTagClassNames);

        for(let _className of imgTagClassNames){
            setImgAttr(dictImg.get(_className), attrImgs.get(_className));
        }

        let icon_volume_off = createTag('i', 'user-icon_volume-off');
        icon_volume_off.className += ' material-icons';
        insertTxtNode(icon_volume_off, 'volume_off');

        for(_className of pTagClassNames){
            insertTxtNode(dictP.get(_className), dictTxts.get(_className));
        }

        layoutGroupChat(element, dictDivs, dictP, dictImg, icon_volume_off);
    }
}

const layoutGroupChat = (element, dictDivs, dictP, dictImg, icon_volume_off) => {
    let sectionGroupChat = createTag('section', 'group_chat');

    element.appendChild(sectionGroupChat);
    sectionGroupChat.appendChild(dictDivs.get('item_photo')).appendChild(dictImg.get('img_item_photo'));
    sectionGroupChat.appendChild(dictDivs.get('item_txt')).appendChild(dictDivs.get('item_meme_name')).appendChild(dictDivs.get('item_meme_description'));
    dictDivs.get('item_meme_description').appendChild(dictP.get('txt_meme'));
    dictDivs.get('item_meme_description').appendChild(icon_volume_off);
    dictDivs.get('item_meme_name').appendChild(dictP.get('txt_time'));

    dictDivs.get('item_txt').appendChild(dictDivs.get('item_meme_date')).appendChild(dictDivs.get('item_flex_row')).appendChild(dictDivs.get('chat_photo'));
    dictDivs.get('chat_photo').appendChild(dictImg.get('img_chat_foto'));
    dictDivs.get('item_flex_row').appendChild(dictP.get('txt_img_type'));
    dictDivs.get('item_meme_date').appendChild(dictDivs.get('msg_count')).appendChild(dictP.get('txt_msg_count'));
}