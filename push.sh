[[ ! -d react-helpers ]] && git clone --no-checkout https://github.com/spidgorny/react-helpers
[[ ! -d .git ]] && mv react-helpers/.git .
[[ -d react-helpers ]] && rm -rf react-helpers
git status
git add .
git commit -m improvements
git push
