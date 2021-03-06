import {Component, OnInit} from '@angular/core';
import {EventServerService} from '../../services/event-server-service/event-server.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

    public notifications: Array<any>;

    constructor(private eventFetcher: EventServerService) {
    }

    ngOnInit() {
        this.getNotifications();
    }

    getNotifications = () => {
        this.notifications = this.eventFetcher.getEventNotifications();
    }

}
