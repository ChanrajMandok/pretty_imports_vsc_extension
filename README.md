# Pretty Imports - Visual Studio Code Extension

## Description

**Pretty Imports** is a Visual Studio Code Extension designed to beautify and organize Python import statements, ensuring they are in accordance with PEP 8 standards. It aims to make your Python code more readable, maintainable, and aesthetically pleasing by providing a clean and organized representation of import statements.

## Features

- **PEP 8 Compliant:** Aligns imports with PEP 8 standards, making your code more consistent and readable.
- **Sorts Imports:** Sorts import statements based on length.
- **Categorizes Imports:** Organizes imports into three distinct sections:
  1. **Direct Imports**
  2. **External Package Imports**
  3. **Project-Specific Imports**
- **Handles Multiple Imports** in parentheses.
- **Preserves Non-Conforming Lines:** Safeguarding your code against potential loss of non-conforming lines.

## How it Works

The extension categorizes and sorts the import statements as follows:
1. **Direct Imports:** Such as `import os`, are sorted by length and placed at the top.
2. **External Package Imports:** Like `from scipy import stats`, are sorted by length and placed after direct imports separated by a blank line.
3. **Project-Specific Imports:** Such as `from my_project import my_module`, are sorted and placed after external package imports separated by a blank line.
4. **Non-Handled Lines:** Any lines not conforming to the expected formats are preserved and included at the bottom, separated by a blank line.

## Example Output
```plaintext
import os
import sys
import math
import asyncio

from numpy import array
from scipy.stats import norm
from collections import deque
from matplotlib import pyplot

from my_project import my_module
from my_project.my_module import my_function
from my_project.sub_module import another_function
from my_project.my_module.sub_module.long_service_name import \
                                               LongServiceName
from my_project.my_module.sub_module.another_long_service_name import \
                                               AnotherLongServiceName
from my_project.my_module.sub_module.yet_another_long_service_name import \
                                               YetAnotherLongServiceName

# Non-conforming or non-handled lines here.
Something not an import
