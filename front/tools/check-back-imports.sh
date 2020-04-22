#!/usr/bin/env bash

readonly APPLICATION_PATH="."

readonly UNAUTHORIZED_IMPORTS="back/src/domain|back/src/use_cases|back/src/infrastructure/config|back/src/infrastructure/repositories|back/src/infrastructure/use_cases_proxy|back/src/infrastructure/vendors|back/src/infrastructure/batch"

readonly UNAUTHORIZED_IMPORTS_IN_TS_COUNT=$(find ${APPLICATION_PATH} -path ./node_modules -prune -o -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS} {} \; | wc -l)
readonly UNAUTHORIZED_IMPORTS_IN_VUE_COUNT=$(find ${APPLICATION_PATH} -path ./node_modules -prune -o -name "*.vue" -exec egrep -w ${UNAUTHORIZED_IMPORTS} {} \; | wc -l)

if [[ "${UNAUTHORIZED_IMPORTS_IN_TS_COUNT}" -eq 0 ]] && [[ "${UNAUTHORIZED_IMPORTS_IN_VUE_COUNT}" -eq 0 ]]; then
  exit 0
fi

echo "${UNAUTHORIZED_IMPORTS_IN_TS_COUNT} unauthorized imports in *.ts files:"
find ${APPLICATION_PATH} -path ./node_modules -prune -o -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS} {} \;
echo "${UNAUTHORIZED_IMPORTS_IN_VUE_COUNT} unauthorized imports in *.vue files:"
find ${APPLICATION_PATH} -path ./node_modules -prune -o -name "*.vue" -exec egrep -lw ${UNAUTHORIZED_IMPORTS} {} \;
exit 1
