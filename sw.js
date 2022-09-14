self.addEventListener('notificationclick', function(event) {
    self.addEventListener("message", e=> {
        clients.openWindow(e.data);
        event.notification.close();
    })
}, false);