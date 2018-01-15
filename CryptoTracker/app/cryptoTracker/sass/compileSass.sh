rm ../css/*.css
rm ../css/*.css.map

# Usage: Compile all scss in folder
for f in *.scss
do
	echo "Compiling SCSS file: $f"
	root="${f%.*}"
	sass "$f" ../css/"$root".css
done