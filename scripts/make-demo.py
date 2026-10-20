"""Assemble real synthetic-data screenshots; optional authoring dependency: Pillow.

制作真实界面的双语截图 GIF；应用构建、运行与 CI 不依赖 Pillow。
"""
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'docs' / 'assets'
FONT_PATH = Path(os.environ.get('DEMO_FONT', 'C:/Windows/Fonts/msyh.ttc'))
if not FONT_PATH.is_file():
    raise SystemExit('Set DEMO_FONT to a CJK-capable font / 请指定支持中文的字体')
EN = [
    'Start with the built-in synthetic HAR. No account needed.',
    'Review failed and slow requests, status and timing.',
    'Preview the sanitized HAR before sharing.',
    'Inspect AI-ready material. No model calls are made.',
    'Export HAR or Markdown, then review business details.'
]
ZH = [
    '使用内置虚构 HAR 体验，无需账号或真实日志。',
    '查看异常与慢请求，核对状态和耗时。',
    '先预览实际脱敏结果，再决定分享。',
    '检查供 AI 分析的材料，页面不调用模型。',
    '导出 HAR 或 Markdown，人工检查业务信息。'
]
font_en = ImageFont.truetype(str(FONT_PATH), 21)
font_zh = ImageFont.truetype(str(FONT_PATH), 20)
font_small = ImageFont.truetype(str(FONT_PATH), 13)
frames = []
for i, (en, zh) in enumerate(zip(EN, ZH), 1):
    with Image.open(ASSETS / f'step-{i}.jpg') as shot:
        page = Image.new('RGB', (1000, 760), '#eef3ef')
        fitted = ImageOps.contain(shot.convert('RGB'), (1000, 640), Image.Resampling.LANCZOS)
        page.paste(fitted, ((1000 - fitted.width) // 2, (640 - fitted.height) // 2))
    draw = ImageDraw.Draw(page)
    draw.rectangle((0, 640, 1000, 760), fill='#14333e')
    draw.text((24, 655), f'{i}/5  {en}', font=font_en, fill='#ffffff')
    draw.text((24, 691), zh, font=font_zh, fill='#b8dbc2')
    draw.text((24, 731), 'SYNTHETIC DATA ONLY / 仅含虚构数据 · Local Utility Lab', font=font_small, fill='#a9bdb6')
    frames.append(page.quantize(colors=192))
frames[0].save(ASSETS / 'demo.gif', save_all=True, append_images=frames[1:], duration=[6000] * 5, loop=0, optimize=False, disposal=2)
with Image.open(ASSETS / 'step-2.jpg') as preview:
    preview.save(ASSETS / 'preview.jpg', quality=88)
print(f'Created 5-frame / 30-second GIF: {(ASSETS / "demo.gif").stat().st_size:,} bytes')
