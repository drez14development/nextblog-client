export default function countUnread(notifications: any) {
    let count = 0;
    notifications.map((n: any) => {
        if(!n.wasRead){
            count++
        }
    })
  return count;
}
