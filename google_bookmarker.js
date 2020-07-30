// alert(document.documentElement.innerHTML);

search_results = document.getElementsByClassName("g");
cites = document.getElementsByTagName("cite");
web_results_flag = false;

function checkWebResults(element){
    if(element.children[0].textContent == "Web results"){
        return true;
    }
    return false;
}

function checkSearch(element){
    if(element.classList.length > 1){
        return false;
    }
    if(web_results_flag){
        return true;
    }
    if(checkWebResults(element)){
        web_results_flag = true;
        return true;
    }
}

function getURL(element){
    return String(element.getElementsByTagName("a")[0].href)
}

bookmarks = []

function getBaseUrl(url){
    var split_url = url.split("/");
    return split_url[0] + "//" + split_url[2];
}

function baseBookmarks(bookmark_list){
    url_list = [];
    for(var bookmark in bookmarks){
        bookmark = bookmarks[bookmark];
        url_list.push(getBaseUrl(bookmark));
    }
    return url_list
}

function checkBookmark(url){
    highest = 0;
    for(var bookmark in bookmarks){
        bookmark = bookmarks[bookmark]
        if(url == bookmark){
            return 3;
        }
        if(url.includes(bookmark)){
            highest = Math.max(highest, 2);
        }
        if(getBaseUrl(url) == getBaseUrl(bookmark)){
            highest = Math.max(highest, 1);
        }
    }
    return highest;
}

var BOOKMARK_LEVEL_MAP = {
    1 : "rgba(255, 255, 50, .1)",
    2 : "rgba(255, 255, 50, .1)",
    3 : "rgba(255, 255, 50, .8)",
};

function starElement(element){
    var text = element.getElementsByTagName("h3")[0].textContent;
    element.getElementsByTagName("h3")[0].textContent = "★ " + text;
}

chrome.runtime.sendMessage(
    "", function(response){
        bookmarks = response;
        bookmark_base = baseBookmarks(bookmarks);

        for(let result of search_results){
            if(!checkSearch(result)){
                continue;
            }
            url = getURL(result);
            bookmark_level = checkBookmark(url)
            if(bookmark_level > 0){
                result.style["backgroundColor"] = BOOKMARK_LEVEL_MAP[bookmark_level];
                result.style["padding"] = "4px";
                if(bookmark_level == 3){
                    starElement(result);
                }
            }
       
        }
    }
)








