

export class RandomColor {
    static getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static getConsitantRandomColorPerUser(tableData: any[], isUserInRoot: boolean): any {
        const colorMap = new Map<string, string>();

        tableData = tableData.map(ele => {
            if(isUserInRoot){
                const userId = ele.user_id; // or use ele.user._id
                if (!colorMap.has(userId)) {
                    colorMap.set(userId, RandomColor.stringToColor(ele.email));
                }
                ele.profile_image = colorMap.get(userId);
            }else{
                const userId = ele.user.user_id; // or use ele.user._id
                if (!colorMap.has(userId)) {
                    colorMap.set(userId, RandomColor.stringToColor(ele.user.email));
                }
                ele.user.profile_image = colorMap.get(userId);
            }
            return ele;
        });
    }

    static stringToColor(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
          const value = (hash >> (i * 8)) & 0xff;
          color += ('00' + value.toString(16)).slice(-2);
        }
        return color;
      }
}