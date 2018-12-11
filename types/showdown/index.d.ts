// Type definitions for Showdown 1.9.0
// Project: https://github.com/coreyti/showdown
// Definitions by: cbowdon <https://github.com/cbowdon>, Pei-Tang Huang <https://github.com/tan9>, Ariel-Saldana <https://github.com/arielsaldana>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = Showdown;
export as namespace showdown;

declare namespace Showdown {

    interface Extension {
        /**
         * Property defines the nature of said sub-extensions and can assume 2 values:
         *
         * * `lang` - Language extensions add new markdown syntax to showdown.
         * * `output` - Output extensions (or modifiers) alter the HTML output generated by showdown
         */
        type: string;
    }

    /**
     * Regex/replace style extensions are very similar to javascript's string.replace function.
     * Two properties are given, `regex` and `replace`.
     */
    interface RegexReplaceExtension extends Extension {
        /**
         * Should be either a string or a RegExp object.
         *
         * Keep in mind that, if a string is used, it will automatically be given a g modifier,
         * that is, it is assumed to be a global replacement.
         */
        regex?: string | RegExp;

        /**
         * Can be either a string or a function. If replace is a string,
         * it can use the $1 syntax for group substitution,
         * exactly as if it were making use of string.replace (internally it does this actually).
         */
        replace?: any; // string | Replace
    }

    /**
     * If you'd just like to do everything yourself,you can specify a filter property.
     * The filter property should be a function that acts as a callback.
     */
    interface FilterExtension extends Extension {
        filter?: (text: string, converter: Converter, options?: ConverterOptions) => string;
    }

    /**
     * Defines a plugin/extension
     * Each single extension can be one of two types:
     *
     * + Language Extension -- Language extensions are ones that that add new markdown syntax to showdown. For example, say you wanted ^^youtube http://www.youtube.com/watch?v=oHg5SJYRHA0 to automatically render as an embedded YouTube video, that would be a language extension.
     * + Output Modifiers -- After showdown has run, and generated HTML, an output modifier would change that HTML. For example, say you wanted to change <div class="header"> to be <header>, that would be an output modifier.
     *
     * Each extension can provide two combinations of interfaces for showdown.
     */
    interface ShowdownExtension extends RegexReplaceExtension, FilterExtension {
    }

    interface ConverterExtensions {
        language: ShowdownExtension[];
        output: ShowdownExtension[];
    }

    interface ShowdownOptions {
        /**
         * Omit the trailing newline in a code block. Ex:
         *
         * This:
         *   <code><pre>var foo = 'bar';
         *   </pre></code>
         *
         * Becomes this:
         *   <code><pre>var foo = 'bar';</pre></code>
         *
         * @default false
         */
        omitExtraWLInCodeBlocks?: boolean;

        /**
         * Disable the automatic generation of header ids. Setting to true overrides <strong>prefixHeaderId</strong>.
         *
         * @default false
         */
        noHeaderId?: boolean;

        /**
         * Use text in curly braces as header id.
         *
         * @default false
         */
        customizedHeaderId?: boolean;

        /**
         * Generate header ids compatible with github style (spaces are replaced
         * with dashes and a bunch of non alphanumeric chars are removed).
         *
         * @default false
         */
        ghCompatibleHeaderId?: boolean;

        /**
         * Add a prefix to the generated header ids.
         * Passing a string will prefix that string to the header id.
         * Setting to true will add a generic 'section' prefix.
         *
         * @default false
         */
        prefixHeaderId?: string | boolean;

        /**
         * Enable support for setting image dimensions from within markdown syntax.
         * Examples:
         *
         *   ![foo](foo.jpg =100x80)     simple, assumes units are in px
         *   ![bar](bar.jpg =100x*)      sets the height to "auto"
         *   ![baz](baz.jpg =80%x5em)  Image with width of 80% and height of 5em
         *
         * @default false
         */
        parseImgDimensions?: boolean;

        /**
         * Set the header starting level. For instance, setting this to 3 means that
         *
         *   # foo
         *
         * will be parsed as
         *
         *   <h3>foo</h3>
         *
         * @default 1
         */
        headerLevelStart?: number;

        /**
         * Turning this option on will enable automatic linking to urls.
         *
         * @default false
         */
        simplifiedAutoLink?: boolean;

        /**
         * This option excludes trailing punctuation from autolinking urls.
         * Punctuation excluded: . ! ? ( ). Only applies if simplifiedAutoLink option is set to true.
         *
         * @default false
         */
        excludeTrailingPunctuationFromURLs?: boolean;

        /**
         * Turning this on will stop showdown from interpreting underscores in the middle of
         * words as <em> and <strong> and instead treat them as literal underscores.
         *
         * Example:
         *
         *   some text with__underscores__in middle
         *
         * will be parsed as
         *
         *   <p>some text with__underscores__in middle</p>
         *
         * @default false
         */
        literalMidWordUnderscores?: boolean;

        /**
         * Enable support for strikethrough syntax.
         * `~~strikethrough~~` as `<del>strikethrough</del>`.
         *
         * @default false
         */
        strikethrough?: boolean;

        /**
         * Enable support for tables syntax. Example:
         *
         *   | h1    |    h2   |      h3 |
         *   |:------|:-------:|--------:|
         *   | 100   | [a][1]  | ![b][2] |
         *   | *foo* | **bar** | ~~baz~~ |
         *
         * See the wiki for more info
         *
         * @default false
         */
        tables?: boolean;

        /**
         * If enabled adds an id property to table headers tags.
         *
         * @default false
         */
        tablesHeaderId?: boolean;

        /**
         * Enable support for GFM code block style.
         *
         * @default true
         */
        ghCodeBlocks?: boolean;

        /**
         * Enable support for GFM takslists. Example:
         *
         *   - [x] This task is done
         *   - [ ] This is still pending
         *
         * @default false
         */
        tasklists?: boolean;

        /**
         * Prevents weird effects in live previews due to incomplete input.
         *
         * @default false
         */
        smoothLivePreview?: boolean;

        /**
         * Tries to smartly fix indentation problems related to es6 template
         * strings in the midst of indented code.
         *
         * @default false
         */
        smartIndentationFix?: boolean;

        /**
         * Disables the requirement of indenting sublists by 4 spaces for them to be nested,
         * effectively reverting to the old behavior where 2 or 3 spaces were enough.
         *
         * @default false
         */
        disableForced4SpacesIndentedSublists?: boolean;

        /**
         * Parses line breaks as like GitHub does, without needing 2 spaces at the end of the line.
         *
         * @default false
         */
        simpleLineBreaks?: boolean;

        /**
         * Makes adding a space between # and the header text mandatory.
         *
         * @default false
         */
        requireSpaceBeforeHeadingText?: boolean;

        /**
         * Enables github @mentions, which link to the username mentioned
         *
         * @default false
         */
        ghMentions?: boolean;

        /**
         * Changes the link generated by @mentions. Showdown will replace {u}
         * with the username. Only applies if ghMentions option is enabled.
         * Example: @tivie with ghMentionsOption set to //mysite.com/{u}/profile will
         * result in <a href="//mysite.com/tivie/profile">@tivie</a>
         *
         * @default https://github.com/{u}
         */
        ghMentionsLink?: string;

        /**
         * Open all links in new windows (by adding the attribute target="_blank" to <a> tags).
         *
         * @default false
         */
        openLinksInNewWindow?: boolean;

        /**
         * Support for HTML Tag escaping. ex: \<div>foo\</div>.
         *
         * @default false
         */
        backslashEscapesHTMLTags?: boolean;
    }


    interface ConverterOptions extends ShowdownOptions {

        extensions?: string | string[];
    }

    interface Converter {
        /**
         * @param text The input text (markdown)
         * @return The output HTML
         */
        makeHtml(text: string): string;

        /**
         * Converts an HTML string into a markdown string
         * 
         * @param src
         * @returns {string}
         */
        makeMarkdown(src: string): string;

        /**
         * Setting a "local" option only affects the specified Converter object.
         *
         * @param optionKey
         * @param value
         */
        setOption(optionKey: string, value: any): void;

        /**
         * Get the option of this Converter instance.
         *
         * @param optionKey
         */
        getOption(optionKey: string): any;

        /**
         * Get the options of this Converter instance.
         */
        getOptions(): ShowdownOptions;

        /**
         * Add extension to THIS converter.
         *
         * @param extension
         * @param name
         */
        addExtension(extension: ShowdownExtension, name: string): void;
        addExtension(extension: ShowdownExtension[], name: string): void;

        /**
         * Use a global registered extension with THIS converter
         *
         * @param extensionName Name of the previously registered extension.
         */
        useExtension(extensionName: string): void;

        /**
         * Get all extensions.
         *
         * @return all extensions.
         */
        getAllExtensions(): ConverterExtensions;

        /**
         * Remove an extension from THIS converter.
         *
         * Note: This is a costly operation. It's better to initialize a new converter
         * and specify the extensions you wish to use.
         *
         * @param extensions
         */
        removeExtension(extensions: ShowdownExtension[] | ShowdownExtension): void;

        /**
         * Set a "local" flavor for THIS Converter instance
         *
         * @param flavor name
         */
        setFlavor(name: string): void;

    }

    interface ConverterStatic {
        /**
         * @constructor
         * @param converterOptions Configuration object, describes which extensions to apply
         */
        new (converterOptions?: ConverterOptions): Converter;
    }
    /** 
     * Helper Interface 
     */
    interface Helper {
        replaceRecursiveRegExp(...args: any[]): string;
    }

    /** Constructor function for a Converter */
    var Converter: ConverterStatic;

    /**
     * Showdown helper
     */
    var helper: Helper;

    /**
     * Setting a "global" option affects all instances of showdown
     * 
     * @param optionKey
     * @param value
     */
    function setOption(optionKey: string, value: any): void;

    /**
     * Retrieve previous set global option.
     * @param optionKey
     */
    function getOption(optionKey: string): any;

    /**
     * Retrieve previous set global options.
     */
    function getOptions(): ShowdownOptions;

    /**
     * Reset options.
     */
    function resetOptions(): void;

    /**
     * Retrieve the default options.
     */
    function getDefaultOptions(): ShowdownOptions;

    /** 
     * Registered extensions
     *
     * @prarm name
     * @param extenstion
     */
    function extension(name: string, extension: (() => ShowdownExtension) | (() => ShowdownExtension[]) | ShowdownExtension): void;

    /**
     * @return The extensions array.
     */
    function getOption(optionKey: string): any;

    var extensions: { [name: string]: ShowdownExtension };

    /**
     * Retrieve previous set global options.
     */
    function getOptions(): ShowdownOptions;

    /**
     * Retrieve the default options.
     */
    function getDefaultOptions(): ShowdownOptions;

    /**
     * @param obj An array of items
     * @param extenstion
     */
    function extension(name: string, extension: (() => ShowdownExtension) | (() => ShowdownExtension[]) | ShowdownExtension): void;

    /**
     * Get an extension.
     *
     * @param name
     * @return The extensions array.
     */

    function resetExtensions(): void;

    /**
     * @return all extensions.
     */
    function getAllExtensions(): { [name: string]: ShowdownExtension[] };

    /**
     * Remove an extension.
     *
     * @param name
     */
    function removeExtension(name: string): void;

    /**
     * Reset extensions.
     */
    function resetExtensions(): void;

    /**
     * Setting a "global" flavor affects all instances of showdown
     *
     * @param name
     */
    function setFlavor(name: string): void;
}
