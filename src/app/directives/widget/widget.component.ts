import {Component, Input, OnInit} from '@angular/core';
import {DruidDataService} from '../../services/druid-data-service/druid-data.service';
import {ChartBaseService} from '../../services/chart-base-service/chart-base.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormGroup} from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

    @Input() item;

    public isChart: boolean = false;
    public isList: boolean = false;
    public state: any;

    public widgetSettingsForm = new FormGroup({});
    public widgetSettingsFormModel = {};
    public widgetSettingsFormFields = [];

    constructor(private druidAPI: DruidDataService, private chartBase: ChartBaseService, public ngxSmartModalService: NgxSmartModalService) {
    }

    ngOnInit() {
        let serializer;
        switch (this.item.chartType) {
            case 'bar':
                serializer = this.barChartSerializer;
                this.state = this.chartBase.getBarBase();
                this.isChart = true;
                break;
            case 'doughnut':
                serializer = this.doughnutChartSerializer;
                this.state = this.chartBase.getDoughnutBase();
                this.isChart = true;
                break;
            case 'line':
                serializer = this.lineChartSerializer;
                this.state = this.chartBase.getLineBase();
                this.isChart = true;
                break;
            case 'list':
                serializer = this.listSerializer;
                this.state = {};
                this.isList = true;
                break;
            default:
                break;
        }

        let data;
        switch (this.item.widgetType) {
            case 'sla_top10':
                this.state.heading = 'Top 10 worst monitors (SLA)';
                data = this.druidAPI.WorstMonitorsSLA15();
                break;
            case 'es_contribution':
                this.state.heading = 'ES contribution';
                data = this.druidAPI.ESContribution();
                break;
            case 'loss_1h':
                this.state.heading = 'Losses in monitor #' + this.item.monitorId;
                data = this.druidAPI.NFLMonitors();
                break;
            case 'delay_top10':
                this.state.heading = '10 Worst Tasks (Delay)';
                data = this.druidAPI.WorstTasksDelay();
                break;
            default:
                data = [];
        }

        serializer(data);
    }

    /**
     * Opens a widget settings modal.
     */
    showSettings = (): void => {
        let modalData = this.item;
        this.ngxSmartModalService.setModalData(modalData, 'widgetSettingsModal', true);
        this.ngxSmartModalService.getModal('widgetSettingsModal').open();
    };

    /**
     * Serializes data for a Bar Chart
     * @param data
     */
    barChartSerializer = (data: any) => {
        const labels = data.map((row) => '#' + row.ID);
        const graphData = data.map((row) => row.Data.SLA);
        this.state.data.labels = labels;
        this.state.data.datasets[0].data = graphData;
    };

    /**
     * Serializes data for a Doughnut Chart
     * @param data
     */
    doughnutChartSerializer = (data: any) => {
        const esconlabels = data.map((row) => row.ID);
        const escongraphData = data.map((row) => row.Data.ES);
        this.state.data.labels = esconlabels;
        this.state.data.datasets[0].data = escongraphData;
    };

    /**
     * Serializes data for a Line Chart
     * @param data
     */
    lineChartSerializer = (data: any) => {
        const nflmlabels = data.map((row) => row.ID);
        const nflmgraphDataNear = data.map((row) => row.Data.Near);
        const nflmgraphDataFar = data.map((row) => row.Data.Far);
        this.state.data.labels = nflmlabels;
        this.state.data.datasets.push({
            label: 'Far loss (%)',
            data: nflmgraphDataFar,
            fill: false,
            borderColor: '#4bc0c0'
        });
        this.state.data.datasets.push({
            label: 'Near loss (%)',
            data: nflmgraphDataNear,
            fill: false,
            borderColor: '#565656'
        });
    };

    /**
     * Serializes data for a List Widget
     * @param data
     */
    listSerializer = (data: any) => {
        this.state.headers = ['Task', 'Delay (ms)'];
        this.state.data = data.map((row) => ['#' + row.ID, row.Data.Delay]);
    };


}
