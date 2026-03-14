#!/bin/bash
# 从 PPT 提取专家头像到网站 images/team/
# 在终端运行：先 cd 到本脚本所在目录，再执行 ./copy_team_photos_from_pptx.sh

PPTX="/Users/leo/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/lichaotao_7c10/msg/file/2026-03/视光机器人-2025-v2.0.pptx"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"
mkdir -p images/team

if [ ! -f "$PPTX" ]; then
  echo "未找到 PPT 文件，请确认路径："
  echo "$PPTX"
  exit 1
fi

TMP=$(mktemp -d)
unzip -o "$PPTX" -d "$TMP" ppt/media/image61.png ppt/media/image62.png ppt/media/image63.png ppt/media/image64.png 2>/dev/null

cp "$TMP/ppt/media/image61.png" images/team/luogang.png
cp "$TMP/ppt/media/image62.png" images/team/matteo.png
cp "$TMP/ppt/media/image63.png" images/team/chenjianwen.png
cp "$TMP/ppt/media/image64.png" images/team/xufeng.png
rm -rf "$TMP"

echo "已从 PPT 复制 4 张专家头像到 images/team/"
ls -la images/team/
