import { Message, MessageBox } from 'element-ui';

/**
 * 删除记录时弹出确认框确认
 * @param {String} type     删除记录的名称：例如 菜单、用户
 */
export function confirmBox(type = '记录', operate = '永久删除') {
    return new Promise((resolve, reject) => {
        MessageBox.confirm('此操作将' + operate + type + ', 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            resolve();
        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消此操作'
            });
            // reject();
        });
    });
}