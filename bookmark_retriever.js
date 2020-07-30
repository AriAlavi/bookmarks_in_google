var bookmark_urls = []
var bookmark_ids = []
chrome.bookmarks.getRecent(1_000_000, function(bookmarks){
    for(var bookmark of bookmarks){
        bookmark_urls.push(bookmark.url);
        bookmark_ids.push(bookmark.id);
    }
})

chrome.bookmarks.onCreated.addListener(function (id, bookmark){
    bookmark_urls.push(bookmark.url);
    bookmark_ids.push(id);
})
chrome.bookmarks.onRemoved.addListener(function(id, removeInfo){
    var element_number = bookmark_ids.indexOf(id);
    bookmark_ids.splice(element_number, 1);
    bookmark_urls.splice(element_number, 1);
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        sendResponse(bookmark_urls)
    }
)