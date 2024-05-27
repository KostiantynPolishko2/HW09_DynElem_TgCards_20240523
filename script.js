document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Start');

    const cardChat = createGroupChat(document.querySelector('main#chat'));
    cardChat('suffer', dictTxts.get('suffer'), dictImgLinks.get('suffer'));
    cardChat('angry', dictTxts.get('angry'), dictImgLinks.get('angry'));
    cardChat('alex', dictTxts.get('alex'), dictImgLinks.get('alex'));
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
    const pTagClassNames = ['txt_meme', 'txt_time', 'txt_img_type', 'txt_msg_count'];

    return (id, dictTxts, dictAttrImgs) => {
        const imgTagClassNames = Array.from(dictAttrImgs.keys());
        const dictDivs = createTagDict('div', divTagClassNames);

        dictDivs.get('item_meme_name').className += ' item_flex_row space_between';
        dictDivs.get('item_meme_description').className += ' item_flex_row';

        const dictP = createTagDict('p', pTagClassNames);
        const dictImg = createTagDict('img', imgTagClassNames);

        for(let _className of imgTagClassNames){
            setImgAttr(dictImg.get(_className), dictAttrImgs.get(_className));
        }

        let icon_volume_off = createTag('i', 'user-icon_volume-off');
        icon_volume_off.className += ' material-icons';
        insertTxtNode(icon_volume_off, 'volume_off');

        for(_className of pTagClassNames){
            insertTxtNode(dictP.get(_className), dictTxts.get(_className));
        }

        layoutGroupChat(element, id, dictDivs, dictP, dictImg, icon_volume_off);
    }
}

const layoutGroupChat = (element, identifier, dictDivs, dictP, dictImg, icon_volume_off) => {
    let sectionGroupChat = createTag('section', 'group_chat');
    sectionGroupChat.id = identifier;

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

    setStyleMsgCount(identifier, dictP.get('txt_msg_count'));
}

const setStyleMsgCount = (identifier, element) => {

    if (element.textContent == '0'){
        element.style.color = 'transparent';
        document.getElementById(identifier).querySelector('div.msg_count').style.backgroundColor = 'transparent';
    }
}