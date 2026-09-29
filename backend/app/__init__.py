"""PixlWorks backend package.

Local-development dependency bootstrap.

`python -m venv` cannot produce a working interpreter on the maintainer's
machine: the base Python lives under a path containing a space
(``C:\\Users\\Fabrizio Gamboa\\...``) and the generated launcher does not quote
it, so every venv dies with ``Unable to create process`` / ``ensurepip`` exit
101. Dependencies are therefore installed into ``backend/.pydeps`` with
``pip install --target``.

Adding that folder to ``sys.path`` here — rather than relying on a ``PYTHONPATH``
environment variable the developer has to remember in every new terminal — means
``python -m uvicorn app.main:app --reload`` just works. Inside Docker the folder
does not exist, so this is a no-op.
"""

import sys
from pathlib import Path

_LOCAL_DEPS = Path(__file__).resolve().parent.parent / ".pydeps"

if _LOCAL_DEPS.is_dir():
    _path = str(_LOCAL_DEPS)
    if _path not in sys.path:
        # First on the path so the pinned versions win over anything global.
        sys.path.insert(0, _path)
