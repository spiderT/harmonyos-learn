import device from '@system.device';

const BUTTON_STATE_IMAGE = ['/common/checkbutton.png', '/common/done.png'];
const TAG_STATE = ['show', 'hide'];
const TEXT_COLOR = ['text-default', 'text-gray'];
const EVENT_LEVEL = ['urgent', 'senior', 'middle', 'low'];

export default {
    data: {
        title: "",
        eventList: [
                "跑步10km",
                "追剧：致命女人",
                "B站：汉密尔顿",
                "618剁手",
        ],
        initialIndex: 0
    },
    onInit() {
        this.title = 'TODO LIST';
        this.$set('taskList', []);
    },
    onShow() {
        for (let index = 0; index < this.eventList.length; index++) {
            const element = {};
            element.id = 'id-' + index;
            element.event = this.eventList[index];
            element.time = this.getRandomTime();
            const completeState = this.getRandom(100) % 2;
            element.checkBtn = BUTTON_STATE_IMAGE[completeState];
            element.color = TEXT_COLOR[completeState];
            element.showTag = TAG_STATE[completeState];
            element.tag = EVENT_LEVEL[this.getRandom(EVENT_LEVEL.length)];
            this.taskList.push(element);
        }

        const _this = this;
        device.getInfo({
            success: function (data) {
//                if (data.deviceType && data.deviceType === 'wearable') {
//                    _this.initialIndex = 2;
//                }
            },
        });
    },
    completeEvent(e) {
        for (let i of this.taskList) {
            if (i.id == e) {
                if (i.checkBtn == "/common.images/done.png") {
                    i.checkBtn = "/common.images/checkbutton.png";
                    i.showTag = 'show';
                    i.color = 'text-default';
                    i.completeState = false;
                } else {
                    i.checkBtn = "/common.images/done.png";
                    i.showTag = 'hide';
                    i.color = 'text-gray';
                    i.completeState = true;
                }
                return;
            }
        }
    },
    getRandomTime() {
        var hour = this.getRandom(24);
        var minute = this.getRandom(60);
        if (minute < 10) {
            minute = '0' + minute;
        }
        return hour + ':' + minute;
    },
    getRandom(range) {
        var num = Math.random();
        num = num * range;
        num = Math.floor(num);
        return num;
    }
}
