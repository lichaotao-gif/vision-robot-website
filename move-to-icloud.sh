#!/bin/bash
# 将视光机器人项目移到 iCloud www 目录（请在终端中运行此脚本）

SOURCE="/Users/leo/vision-robot-website"
# 常见 iCloud www 路径（二选一，根据你实际创建位置调整）
ICLOUD_WWW_1="$HOME/Library/Mobile Documents/www"
ICLOUD_WWW_2="$HOME/Library/Mobile Documents/com~apple~CloudDocs/www"

if [ -d "$ICLOUD_WWW_1" ]; then
    DEST="$ICLOUD_WWW_1"
elif [ -d "$ICLOUD_WWW_2" ]; then
    DEST="$ICLOUD_WWW_2"
else
    echo "未找到 iCloud 下的 www 目录，请确认路径。"
    echo "可选：在 Finder 中打开 iCloud Drive，把 www 的完整路径发给我。"
    exit 1
fi

if [ ! -d "$SOURCE" ]; then
    echo "源目录不存在: $SOURCE"
    exit 1
fi

echo "将从: $SOURCE"
echo "移到: $DEST"
read -p "确认执行? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    mv "$SOURCE" "$DEST/"
    echo "已移动完成。项目现在在: $DEST/vision-robot-website"
else
    echo "已取消。"
fi
